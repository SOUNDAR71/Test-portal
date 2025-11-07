const calculateScore = () => {
  let score = 0;

  console.log("START SCORE CALCULATION");
  console.log("Questions:", questions);
  console.log("Answers:", answers);

  questions.forEach((q, i) => {
    const key = q.id || q._id;
    const correct = q.correct_option;
    const selected = answers[key];

    console.log(`Q${i + 1}:`, q.question);
    console.log("   Key Used:", key);
    console.log("   Correct:", correct);
    console.log("   Selected:", selected);

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
