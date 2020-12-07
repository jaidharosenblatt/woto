/**
 * @function
 * @param {Object} store - Redux store
 * @returns {String} courseID
 */
const getCourseID = (store) => {
  return store.currentCourse;
};

export default { getCourseID };
