import React, { useEffect, useState } from "react";
import { WelcomeScreen, FinishedScreen } from "./Screen";
import { fetchQuestions } from "./Questions";
import QuizScreen from "./QuizScreen";
import { useNavigate } from "react-router-dom";
import { CalcutateScore } from "./CalcutateScore";

const Test = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(60);
  const [autoSkipped, setAutoSkipped] = useState(false); // ✅ Correct spelling

  // Fetch questions from backend
  useEffect(() => {
    fetchQuestions().then((data) => {
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
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
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
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [started, finished]);

  // Timer logic per question
  useEffect(() => {
    if (!started || finished) return;

    setTimer(60); 

    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          setAutoSkipped(true);   // record auto skip
          if (currentQ < questions.length - 1) {
            setCurrentQ((prev) => prev + 1);
          } else {
              setFinished(true);
            }
          return 60;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQ, started, finished]);

  // Handle answer change
  const handleChange = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  // Next question logic
  const handleNext = () => {
  setAutoSkipped(false);
  if (currentQ < questions.length - 1) {
    setCurrentQ((prev) => prev + 1);
  } else {
    setFinished(true);
  }
};


  // Redirect after finish
  useEffect(() => {
    if (finished) {
      const timeout = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timeout);
    }
  }, [finished, navigate]);

  if (!started) return <WelcomeScreen setStarted={setStarted} />;
  if (finished)
    return (
      <FinishedScreen
        score={CalcutateScore(questions, answers)}
        total={questions.length}
        navigate={navigate}
      />
    );

  const q = questions[currentQ];
  if (!q) return <div className="mt-10 top-10">Loading...</div>;

  return (
    <QuizScreen
      q={q}
      currentQ={currentQ}
      questions={questions}
      answers={answers}
      handleChange={handleChange}
      handleNext={handleNext}
      setCurrentQ={setCurrentQ}
      autoSkipped={autoSkipped} 
      timer={timer}
    />
  );
};

export default Test;
