/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Array} courses
 */
const getSortedCourses = (store) => {
  return store.sortedCourses;
};

export default { getSortedCourses };
