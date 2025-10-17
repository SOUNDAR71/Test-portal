import React, { useEffect, useState } from "react";
import { WelcomeScreen, FinishedScreen } from "./Screen";
import { fetchQuestions } from "./Questions";
import QuizScreen from "./QuizScreen";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(60); // 1 min per question

  // Fetch questions from backend
  useEffect(() => {
    fetchQuestions().then((data) => setQuestions(data));
  }, []);

  // Fullscreen exit detection
  useEffect(() => {
    if (!started || finished) return;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        alert("You exited fullscreen! Test will be submitted.");
        setFinished(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [started, finished]);

  // Tab switch detection
  useEffect(() => {
    if (!started || finished) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("You switched tabs! Test will be submitted.");
        setFinished(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [started, finished]);

  // Timer for each question
  useEffect(() => {
    if (!started || finished) return;

    setTimer(60); // Reset timer for new question

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleNext();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQ, started, finished]);

  // Handle option select
  const handleChange = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  // Next question
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
  if (finished) {
    // Auto-redirect to home after 3 seconds
    setTimeout(() => navigate("/"), 3000);
    return (
      <FinishedScreen
        score={calculateScore()}
        total={questions.length}
        navigate={navigate}
      />
    );
  }

  const q = questions[currentQ];

  return (
    <div>
      <div className="text-center font-bold text-lg mb-2">
        Time left: {timer}s
      </div>
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
    </div>
  );
};

export default Test;
