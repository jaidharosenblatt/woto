import API from "../../api/API";
/**
 * Get relevant information for the particular course
 * @param {*} courses - entire courses state
 * @param {*} courseID
 */
export const select = (courses, courseID) => {
  const course = courses[courseID];

  return {
    loading: courses?.loading,
    error: courses?.error,
    course,
    session: course?.session,
    activeQuestion: course?.session?.activeQuestion,
    discussions: course?.discussions ? course?.discussions : [],
    activeDiscussion: course?.activeDiscussion,
    stats: course?.session?.stats,
    bypassSession: course?.bypassSession,
    description: getDescription(course),
  };
};

// Get description from either question or discussion
const getDescription = (course) => {
  let description = {};
  if (course?.activeDiscussion) {
    description = course?.activeDiscussion?.description;
  }
  if (course?.session?.activeQuestion) {
    description = course?.session?.activeQuestion.description;
  }
  return description;
};

const mapStateToProps = (state, prevProps) => {
  return {
    courses: state.courses,
    ...prevProps,
  };
};

/**
 * Update the user's meeting url
 * @param {*} meetingURL
 */
const setMeetingURL = async (meetingURL) => {
  try {
    await API.editProfile({ meetingURL: meetingURL });
  } catch (error) {
    console.error(error.response ? error.response.data.message : error);
  }
};

export default { select, mapStateToProps, setMeetingURL };
