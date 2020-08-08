import API from "../../../api/API";
import { actions } from "./actions";

// Join the queue but submitting a question with empty description
const joinQueue = async (state, dispatch) => {
  try {
    const question = await API.postQuestion(state.course._id);
    dispatch({ type: actions.SET_QUESTION, payload: question });
  } catch (error) {
    console.log(error);
  }
};

// Join the queue but submitting a question with empty description
const joinWotoRoom = async (state, dispatch) => {
  dispatch({ type: actions.JOIN_WOTO_ROOM });
};

// Update the user's meeting url
const patchMeetingURL = async (meetingURL) => {
  try {
    await API.editProfile({ meetingURL: meetingURL });
    // dispatch({
    //   type: actions.EDIT,
    //   payload: { user: { ...response } },
    // });
  } catch (error) {
    console.log(error);
  }
};

// Submit a question for an active session
const submitQuestion = async (state, dispatch, values) => {
  try {
    // if there is a meeting url then they wanted to join woto
    if (values.meetingURL) {
      await patchMeetingURL(values.meetingURL);
    }

    const [response] = await Promise.all([
      API.patchQuestion(state.question._id, {
        description: values,
      }), // patch to add question description
      archiveExistingDiscussions(), // update meeting room link
    ]);

    dispatch({ type: actions.SET_QUESTION, payload: response });
  } catch (error) {
    console.log(error);
  }
};

// Edit TA question and discussion
const editSubmission = async (state, dispatch, values) => {
  try {
    if (state.discussion) {
      const response = API.editDiscussion(state.discussion._id, {
        description: values,
      });
      dispatch({ type: actions.SET_DISCUSSION, payload: response });
    }
    if (state.question) {
      const response = API.patchQuestion(state.question._id, {
        description: values,
      });
      dispatch({ type: actions.SET_QUESTION, payload: response });
    }
  } catch (error) {
    console.log(error);
  }
};

// Leave the TA queue and remove discussion from state (but don't archive discussion)
const leaveTAQueue = async (state, dispatch) => {
  try {
    const response = await API.patchQuestion(state.question._id, {
      active: false,
    });
    dispatch({ type: actions.SET_QUESTION, payload: response });
  } catch (error) {
    console.log(error);
  }
};

// Remove all other wotos that match user id
const archiveExistingDiscussions = async (state, dispatch, authState) => {
  const discussions = await API.getWotoData(state.course._id);
  discussions.forEach(async (discussion) => {
    // check if matches the current user
    if (!discussion.archived && discussion.owner._id === authState.user._id) {
      await API.editDiscussion(discussion._id, {
        archived: true,
      });
    }
  });
};

// Post a new discussion
const postDiscussion = async (state, dispatch, values) => {
  if (values.meetingURL) {
    await patchMeetingURL(values.meetingURL); // update meeting room link
  }
  try {
    const response = await API.askWotoQuestion(state.course._id, {
      description: { ...state.description, ...values }, // add values to existing description
    });
    dispatch({ type: actions.SET_DISCUSSION, payload: response });
  } catch (error) {
    console.error(error);
  }
};

// Archive discussion
const archiveDiscussion = async (state, dispatch) => {
  try {
    const response = await API.editDiscussion(state.discussion._id, {
      archived: true,
    });
    dispatch({ type: actions.SET_DISCUSSION, payload: response });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Join a Woto and leave your previous one
 * @param {value} id of woto to join
 */
const joinDiscussion = async (state, dispatch, value) => {
  dispatch({ type: actions.JOIN_WOTO_ROOM, payload: value });
  try {
    await Promise.all([
      API.joinDiscussion(value.id),
      archiveExistingDiscussions(),
    ]);
  } catch (err) {
    console.error(err.response.data.message);
  }
};

/**
 * Join a Woto and leave your previous one
 * @param {value} id of woto to join
 */
const leaveDiscussion = async (state, dispatch, value) => {
  dispatch({ type: actions.LEAVE_DISCUSSION });
};

export default {
  joinQueue,
  joinWotoRoom,
  patchMeetingURL,
  submitQuestion,
  editSubmission,
  leaveTAQueue,
  postDiscussion,
  archiveDiscussion,
  joinDiscussion,
  leaveDiscussion,
};
