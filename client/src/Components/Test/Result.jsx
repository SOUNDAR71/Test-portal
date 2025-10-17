export default function Result({ score, total }) {
  return (
    <div>
      <h2>Test Completed!</h2>
      <p>
        Your Score: {score} / {total}
      </p>
    </div>
  );
}
