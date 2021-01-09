import API from "../../../api/API";
import Papa from "papaparse";

import selectors from "../../selectors";
const {
  setError,
  setSuccessMessage,
  setServerError,
} = require("../../status/actionCreators");

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

/**
 * Add a student for the given course by parsing CSV data
 * @param {CSV} file
 */
export const csvToStudents = (file) => async (dispatch, getState) => {
  const csvCallback = async ({ data }) => {
    const courseID = selectors.getCourseID(getState());
    const students = csvToObject(data);

    try {
      const res = await API.inviteDukeStudents(courseID, students);
      console.log(res);
    } catch (error) {
      dispatch(setError(error));
    }
  };

  const errorCallback = () => dispatch(setServerError("Unable to parse CSV"));

  Papa.parse(file, { error: errorCallback, complete: csvCallback });
};

/**
 * Convert CSV array into a Js object
 * @param {Array} data
 * @returns {Object}
 */
const csvToObject = (data) => {
  let students = [];
  const header = data[0];
  data.slice(1).forEach((row) => {
    let student = {};
    header.forEach((key, i) => {
      student[key] = row[i];
    });
    students.push(student);
  });
  return students;
};
