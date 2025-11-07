const calculateScore = () => {
  let score = 0;

  questions.forEach((q, i) => {
    const key = q.id || q._id;
    const correct = q.correct_option;
    const selected = answers[key];

    if (selected === correct) {
      console.log(" Correct");
      score++;
    } else {
      console.log(" Wrong");
    }
  });

  console.log(" Final Score:", score);
  return score;
};
