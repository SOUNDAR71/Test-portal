import React, { useEffect, useState } from "react";
import { WelcomeScreen, FinishedScreen } from "./Screen";
import { fetchQuestions } from "./Questions";
import QuizScreen from "./QuizScreen";
import { useNavigate } from "react-router-dom";
import useExamSecurity from "../Security/useExamSecurity";
import ExamCamera from "../Security/ExamCamera";

const Test = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const [violationCount, setViolationCount] = useState(0);

  // Fetch questions from backend
  useEffect(() => {
    fetchQuestions().then((data) => setQuestions(data));
  }, []);

  // Function to send camera snapshots to backend
  const handleSnapshot = async (formData) => {
    try {
      await fetch("/api/save-snapshot", {
        method: "POST",
        body: formData,
      });
    } catch (err) {
      console.error("Failed to send snapshot", err);
    }
  };

  // Continuous fullscreen check every second
  useEffect(() => {
    if (!started || finished) return;

    const interval = setInterval(() => {
      if (!document.fullscreenElement) {
        alert("You exited fullscreen! Test will be submitted.");
        setFinished(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [started, finished]);

  // Exam security hook (tab switch, etc.)
  useExamSecurity((message) => {
    if (started && !finished) {
      setViolationCount((prev) => {
        const newCount = prev + 1;

        // Capture snapshot immediately on violation
        const video = document.querySelector("video");
        if (video) {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext("2d").drawImage(video, 0, 0);
          canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append("snapshot", blob, "violation.jpg");
            handleSnapshot(formData);
          }, "image/jpeg");
        }

        if (newCount >= 3) {
          alert(`3 violations detected. Test will be submitted.`);
          setFinished(true);
        } else {
          alert(`Violation detected: ${message}`);
        }

        return newCount;
      });
    }
  });

  // Handle option select
  const handleChange = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  // Next button
  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setFinished(true);
    }
  };

  // Calculate score
  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_option) score++;
    });
    return score;
  };

  // Start / Finished Screens
  if (!started) return <WelcomeScreen setStarted={setStarted} />;
  if (finished)
    return (
      <FinishedScreen
        score={calculateScore()}
        total={questions.length}
        navigate={navigate}
      />
    );

  const q = questions[currentQ];

  return (
    <>
    {/* Camera Security Component */}
    <ExamCamera onViolation={(message) => {
    setViolationCount(prev => {
    const newCount = prev + 1;
    alert(`Warning ${newCount}: ${message}`);
    if (newCount >= 3) setFinished(true); // auto submit after 3 violations
    return newCount;
  });
}} />


      {/* Quiz Component */}
      <QuizScreen
        q={q}
        currentQ={currentQ}
        questions={questions}
        answers={answers}
        handleChange={handleChange}
        handleNext={handleNext}
        setCurrentQ={setCurrentQ}
        setFinished={setFinished} 
      />
    </>
  );
};

export default Test;
