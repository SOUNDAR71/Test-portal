export default function QuestionCard({ question, onAnswer }) {
  return (
    <div>
      <h3>{question.text}</h3>
      {question.options.map((opt, i) => (
        <label key={i}>
          <input
            type="radio"
            name={question._id}
            value={opt}
            onChange={() => onAnswer(question._id, opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}
