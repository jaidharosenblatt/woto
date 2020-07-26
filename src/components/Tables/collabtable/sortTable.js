// Sort data
export function sortTable(data, currentQuestion, maxSize) {
  const NINETY_MINS = 90 * 60 * 1000;

  data.sort(function(a, b) {
    //Check if one of the submissions is yours and the other is not
    if (a.isYou && !b.isYou) {
      return -1;
    }
    if (b.isYou && !a.isYou) {
      return 1;
    }
    // Check if two values are greater than 90 mins between
    if (Math.abs(a.createdAt - b.createdAt) > NINETY_MINS) {
      return 1;
    }

    if (a.size >= maxSize && b.size < maxSize) {
      return 1;
    }
    if (b.size >= maxSize && a.size < maxSize) {
      return -1;
    }

    // Sort by date if no question
    if (!currentQuestion) {
      return a.createdAt - b.createdAt;
    }

    //Check if one of the submissions matches assignment and other doesn't
    if (
      a.assignment[0] === currentQuestion.assignment[0] &&
      b.assignment[0] !== currentQuestion.assignment[0]
    ) {
      return -1;
    }
    if (
      b.assignment[0] === currentQuestion.assignment[0] &&
      a.assignment[0] !== currentQuestion.assignment[0]
    ) {
      return 1;
    }
    //Check if one of the submissions matches stage and other doesn't
    if (
      a.stage === currentQuestion.stage &&
      b.stage !== currentQuestion.stage
    ) {
      return -1;
    }
    if (
      b.stage === currentQuestion.stage &&
      a.stage !== currentQuestion.stage
    ) {
      return 1;
    }

    return 0;
  });
}
