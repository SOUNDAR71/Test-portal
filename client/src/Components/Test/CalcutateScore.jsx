export const CalcutateScore = (questions, answers) => {
  let score = 0;

  questions.forEach((q) => {
    if (answers[q.id] === q.correct_option) score++;
  });

  return score;
};
