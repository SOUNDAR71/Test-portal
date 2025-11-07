export const CalcutateScore = (questions, answers) => {
  let score = 0;

  questions.forEach((q) => {
    const key = q.id || q._id;
    if (answers[key] === q.correct_option) score++;
  });

  return score;
};
