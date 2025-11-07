import React from "react";

export default function QuizScreen({
  q,
  currentQ,
  questions,
  answers,
  handleChange,
  handleNext,
  setCurrentQ,
  autoSkipped,
  timer
}) {
  return (
    <div className="min-h-screen w-full bg-gray-100 p-6 flex flex-col items-center justify-center">
      <h1 className="text-center text-3xl font-bold mb-6">MCQ Test</h1>

      <div className="w-full max-w-[1200px] min-h-[600px] p-6 bg-white rounded-lg shadow">

        <div className="mb-4 text-center">
          <span className={`text-2xl font-bold px-4 py-2 rounded ${timer <= 10 ? "text-red-600 animate-pulse" : "text-green-700"}`}>
            Time Left: {timer}s
          </span>
        </div>

        <p className="font-semibold mt-10 mb-6 text-lg">
          {currentQ + 1}. {q.question}
        </p>

        <div className="grid grid-cols-1 gap-6 mt-10">
          {q.options.map((opt, index) => (
            <label
              key={index}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                answers[q.id] === opt
                  ? "border-blue-600 bg-blue-100"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name={`q${q.id}`}
                value={opt}
                checked={answers[q.id] === opt}
                onChange={() => handleChange(q.id, opt)}
                className="hidden"
              />
              <span className="font-medium">
                {String.fromCharCode(65 + index)}) {opt}
              </span>
            </label>
          ))}
        </div>

        <div className="mt-20 flex justify-end">
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            disabled={!answers[q.id]}
          >
            {currentQ === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
