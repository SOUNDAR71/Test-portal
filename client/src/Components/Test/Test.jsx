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
    fetchQuestions().then((data) => {
      console.log(" Questions fetched from backend:", data);
      setQuestions(data);
    });
  }, []);

  // Detect exit from fullscreen
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

  // Detect tab switch
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

  // Timer logic
  useEffect(() => {
    if (!started || finished) return;

    setTimer(60); // reset timer for each question
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

  // Handle answer selection
  const handleChange = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  // Next question
  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      setFinished(true);
    }a
  };

  // Calculate score
  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_option) score++;
    });
    return score;
  };

  // Redirect after finish (run only once)
  useEffect(() => {
    if (finished) {
      const timeout = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timeout);
    }
  }, [finished, navigate]);

  // Screens
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
  if (!q) return <div>Loading...</div>;

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
