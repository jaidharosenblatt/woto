/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Array} courses
 */
const getSortedCorses = (store) => {
  return store.sortedCourses;
};

export default { getSortedCorses };
