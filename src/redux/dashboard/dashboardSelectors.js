/**
 * @function
 * Get current assistant
 * @param {Object} store - Redux store
 * @returns {ObjectId} assistant's id
 */
const getDashboardAssistant = (store) => {
  return store.dashboard?.assistant;
};

/**
 * @function
 * Get the currently selected start date for the dashboard
 * @param {Object} store - Redux store
 * @returns {String} unix date
 */
const getDashboardStartDate = (store) => {
  return store.dashboard?.startDate;
};

/**
 * @function
 * Get the currently selected end date for the dashboard
 * @param {Object} store - Redux store
 * @returns {String} unix date
 */
const getDashboardEndDate = (store) => {
  return store.dashboard?.endDate;
};

/**
 * @function
 * Get dashboard data for the home page
 * @param {Object} store - Redux store
 * @returns {Object} response from ataglance endpoint call
 */
const getDashboardHome = (store) => {
  return store.dashboard?.home;
};

/**
 * @function
 * Get the courseId being displayed on the dashboard
 * @param {Object} store - Redux store
 * @returns {ObjectId} matching course
 */
const getDashboardCourse = (store) => {
  return store.dashboard?.course;
};
