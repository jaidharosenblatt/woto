import API from "../../../api/API";
import { fetchDiscussions } from "./fetches";
import selectors from "../../selectors";
import {
  startLoading,
  stopLoading,
  clearError,
  setServerError,
} from "../../status/actionCreators";
import { setActiveDiscussion } from "./actionCreators";
import { editProfile } from "../../auth/actionCreators";

/**
 * Load the discussions for a given course into cache
 * @param {*} courseID
 * @param {*} userID
 */
export const loadDiscussions = () => async (dispatch) => {
  dispatch(startLoading());

  await dispatch(fetchDiscussions());

  dispatch(stopLoading());
};

/**
 * Post a discussion to a given course
 * @param {*} courseID
 * @param {*} userID
 * @param {*} description
 */
export const postDiscussion = (description, meetingURL) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());
  const courseID = selectors.getCourseID(getState());

  try {
    await API.postDiscussion(courseID, { description });

    if (meetingURL) {
      await dispatch(editProfile({ meetingURL }));
    }

    await dispatch(fetchDiscussions());
    dispatch(clearError());
  } catch (error) {
    dispatch(setServerError("posting your Woto Room"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Close/archive a discussion
 * @param {*} courseID
 * @param {*} userID
 * @param {*} discussionID
 */
export const closeDiscussion = (discussionID) => async (dispatch, getState) => {
  dispatch(startLoading());

  const courseID = selectors.getCourseID(getState());
  try {
    await API.editDiscussion(discussionID, { archived: true });
    dispatch(setActiveDiscussion(courseID, null));
    await dispatch(fetchDiscussions());
    dispatch(clearError());
  } catch (error) {
    dispatch(setServerError("closing your Woto Room"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Add user as a participant to a discussion
 * @param {*} courseID
 * @param {*} userID
 * @param {Object} discussionID
 */
export const joinDiscussion = (discussion) => async (dispatch) => {
  dispatch(startLoading());

  try {
    await API.joinDiscussion(discussion._id);
    await dispatch(fetchDiscussions());
    dispatch(clearError());
  } catch (error) {
    dispatch(setServerError("joining this Woto Room"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

/**
 * Remove user from a discussion
 * @param {*} courseID
 * @param {*} userID
 * @param {*} discussionID
 */
export const leaveDiscussion = (discussionID) => async (dispatch, getState) => {
  dispatch(startLoading());

  const courseID = selectors.getCourseID(getState());
  try {
    await API.leaveDiscussion(discussionID);
    dispatch(setActiveDiscussion(courseID, null));
    dispatch(clearError());
  } catch (error) {
    dispatch(setServerError("leaving this Woto Room"));
    console.error(error);
  } finally {
    dispatch(stopLoading());
  }
};

// // ***TODO***
// export const markAway = async (state, dispatch, user) => {
//     dispatch({ type: actions.SET_LOADING });
//     const temp = state.discussion.participants.map((item) => {
//         if (item.participant === user.participant) {
//             return { ...item, active: false };
//         }
//         return item;
//     });
//     console.log(temp);

//     try {
//         const response = await API.editDiscussion(state.discussion._id, {
//             participants: temp,
//         });
//         await setDiscussions(state, dispatch);
//         dispatch({ type: actions.SET_DISCUSSION, payload: response });
//     } catch (error) {
//         console.error(error.response ? error.response.data.message : error);
//     }
// };
