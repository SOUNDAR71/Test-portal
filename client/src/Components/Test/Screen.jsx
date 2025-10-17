import React from "react";

// Welcome Screen
export function WelcomeScreen({ setStarted }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to Aptitude Test</h1>
      <button
        onClick={async () => {
          try {
            if (document.documentElement.requestFullscreen) {
              await document.documentElement.requestFullscreen();
            }
            setStarted(true); // Start test after fullscreen
          } catch (err) {
            alert("Fullscreen is required to start the quiz!");
          }
        }}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Fullscreen
      </button>
    </div>
  );
}

// Finish Screen
export function FinishedScreen({ score, total, navigate }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Quiz Finished 🎉</h1>
      <p className="text-xl">
        Your score is {score} / {total}
      </p>
      <div className="mt-10">
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 py-2 px-3 rounded-lg font-bold text-lg"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
