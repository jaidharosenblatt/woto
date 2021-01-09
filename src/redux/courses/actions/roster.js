import API from "../../../api/API";
import Papa from "papaparse";

import selectors from "../../selectors";
import actionsTypes from "../actionsTypes";
const {
  setError,
  setSuccessMessage,
  setServerError,
  startPageLoading,
  stopPageLoading,
  startLoading,
  stopLoading,
} = require("../../status/actionCreators");

export const fetchRoster = () => async (dispatch) => {
  dispatch(startPageLoading());
  await dispatch(refetchRoster());
  dispatch(stopPageLoading());
};

export const refetchRoster = () => async (dispatch, getState) => {
  const courseID = selectors.getCourseID(getState());
  dispatch(startLoading());
  try {
    const res = await API.getStudents(courseID);
    const students = cleanData([...res.students]);
    const assistants = cleanData([...res.assistants]);
    dispatch({
      type: actionsTypes.SET_STUDENT_ROSTER,
      courseID,
      payload: students,
    });
    dispatch({
      type: actionsTypes.SET_TA_ROSTER,
      courseID,
      payload: assistants,
    });
  } catch (error) {
    setServerError(error);
  } finally {
    dispatch(stopLoading());
  }
};

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
    error && dispatch(setServerError(error));
    success && dispatch(setSuccessMessage(success));
    if (!error) {
      await dispatch(refetchRoster());
    }
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
      await dispatch(refetchRoster());
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

/**
 * Add key to data for use in columns
 * @param {Array} data
 * @returns {Array} data
 */
const cleanData = (data) => {
  return data.map((item) => {
    return { key: item._id, ...item };
  });
};
