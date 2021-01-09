import API from "../../../api/API";
import selectors from "../../selectors";
const { setError, setSuccessMessage } = require("../../status/actionCreators");

/**
 * Add a student for the given course
 * @param {Object} student netId, name, and role
 */
export const addStudent = (student) => async (dispatch, getState) => {
  const courseID = selectors.getCourseID(getState());
  const students = [student];
  try {
    const res = await API.inviteDukeStudents(courseID, students);
    const error = res.failures[0]?.message;
    const success = res.successes[0]?.message;
    error && dispatch(setError(error));
    success && dispatch(setSuccessMessage(success));
  } catch (error) {
    dispatch(setError(error));
  }
};
