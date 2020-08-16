export function getTAStats(userId, questions) {
  const myQuestions = questions.filter(
    (question) => question.assistant?.id === userId
  );

  const averageLength = getAverageLength(myQuestions);
  const averageLengthMins = (averageLength / (1000 * 60)).toFixed(2);

  return {
    helped: myQuestions.length,
    waiting: questions.length,
    averageLength: averageLengthMins,
  };
}

function getAverageLength(questions) {
  var sum = 0;
  questions.forEach((question) => {
    const start = new Date(question.assistant.description.joinedAt);
    const end = new Date(question.assistant.description.endedAt);
    const time = Math.abs(start - end);
    sum += time;
  });
  return Math.ceil(sum / questions.length);
}
