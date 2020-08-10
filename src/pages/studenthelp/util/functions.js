import API from "../../../api/API";
import { actions } from "./actions";
import { getCommonValues } from "../../../utilfunctions/getCommonValues";

// Join the queue but submitting a question with empty description
const joinQueue = async (state, dispatch) => {
  dispatch({ type: actions.SET_LOADING });
  try {
    const question = await API.postQuestion(state.course._id);
    dispatch({ type: actions.SET_QUESTION, payload: question });
  } catch (error) {
    console.error(error.response ? error.response.data.message : error);
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
    console.error(error.response ? error.response.data.message : error);
  }
};

// Submit a question for an active session
const submitQuestion = async (state, dispatch, values, authState) => {
  dispatch({ type: actions.SET_LOADING });

  try {
    const [response] = await Promise.all([
      API.patchQuestion(state.question._id, {
        description: values,
      }), // patch to add question description
      archiveExistingDiscussions(state, dispatch, authState),
    ]);

    dispatch({ type: actions.SET_QUESTION, payload: response });
  } catch (error) {
    console.error(error.response ? error.response.data.message : error);
  }
};

// Edit TA question and discussion
const editSubmission = async (state, dispatch, values) => {
  dispatch({ type: actions.SET_LOADING });

  try {
    // edit ta question if it exists
    const question =
      state.question &&
      (await API.patchQuestion(state.question._id, {
        description: values,
      }));

    // edit discussion if it exists
    const discussion =
      state.discussion &&
      (await API.editDiscussion(state.discussion._id, {
        description: values,
      }));

    // dispatch both
    if (state.discussion && state.question) {
      dispatch({
        type: actions.EDIT_SUBMISSION,
        payload: { discussion, question },
      });
    } else if (state.discussion) {
      dispatch({ type: actions.SET_DISCUSSION, payload: discussion });
    } else {
      dispatch({ type: actions.SET_QUESTION, payload: question });
    }
  } catch (error) {
    console.error(error.response ? error.response.data.message : error);
  }
};

// Leave the TA queue and remove discussion from state (but don't archive discussion)
const leaveTAQueue = async (state, dispatch) => {
  dispatch({ type: actions.SET_LOADING });

  try {
    const response = await API.patchQuestion(state.question._id, {
      active: false,
    });
    dispatch({ type: actions.SET_QUESTION, payload: response });
  } catch (error) {
    console.error(error.response ? error.response.data.message : error);
  }
};

// Set discussions in current course to context
const setDiscussions = async (state, dispatch) => {
  dispatch({ type: actions.SET_LOADING });
  try {
    const res = await API.getWotoData(state.course._id);
    const discussions = res.filter((discussion) => !discussion.archived);
    dispatch({ type: actions.SET_DISCUSSIONS, payload: discussions });
    return discussions;
  } catch (error) {
    console.error(error.response ? error.response.data.message : error);
  }
};

// Remove all other wotos that match user id
const archiveExistingDiscussions = async (state, dispatch, authState) => {
  const discussions = await API.getWotoData(state.course._id);
  discussions.forEach(async (discussion) => {
    // check if matches the current user
    if (!discussion.archived && discussion.owner._id === authState.user._id) {
      try {
        await API.editDiscussion(discussion._id, {
          archived: true,
        });
      } catch (error) {
        console.error(error.response ? error.response.data.message : error);
      }
    }
  });
};

// Find active discussion for user
const findMyDiscussion = async (state, dispatch, authState) => {
  const discussions = await API.getWotoData(state.course._id);
  discussions.forEach((discussion) => {
    // check if matches the current user
    if (!discussion.archived && discussion.owner._id === authState.user._id) {
      dispatch({ type: actions.SET_DISCUSSION, payload: discussion });
      console.log("Found discussion", discussion);
    }
  });
};

// Post a new discussion
const postDiscussion = async (state, dispatch, values) => {
  dispatch({ type: actions.SET_LOADING });

  if (values.meetingURL) {
    await patchMeetingURL(values.meetingURL); // update meeting room link
  }
  try {
    const response = await API.askWotoQuestion(state.course._id, {
      description: { ...state.description, ...values }, // add values to existing description
    });
    dispatch({ type: actions.SET_DISCUSSION, payload: response });
  } catch (error) {
    console.error(error.response ? error.response.data.message : error);
  }
};

// Archive discussion
const archiveDiscussion = async (state, dispatch) => {
  dispatch({ type: actions.SET_LOADING });

  try {
    const response = await API.editDiscussion(state.discussion._id, {
      archived: true,
    });
    dispatch({ type: actions.SET_DISCUSSION, payload: response });
  } catch (error) {
    console.error(error.response ? error.response.data.message : error);
  }
};

/**
 * Join a Woto and leave your previous one
 * @param {value} id of woto to join
 */
const joinDiscussion = async (state, dispatch, value, authState) => {
  dispatch({ type: actions.SET_LOADING });

  try {
    await Promise.all([
      API.joinDiscussion(value.id),
      archiveExistingDiscussions(state, dispatch, authState),
    ]);
  } catch (error) {
    console.error(error.response ? error.response.data.message : error);
  }
  let commonValues = getCommonValues(state.description, value.description);
  dispatch({
    type: actions.JOIN_DISCUSSION,
    payload: { discussion: value, commonValues: commonValues },
  });
};

/**
 * Join a Woto and leave your previous one
 * @param {value} id of woto to join
 */
const leaveDiscussion = async (state, dispatch, value) => {
  dispatch({ type: actions.LEAVE_DISCUSSION });
};

/**
 * Join a Woto and leave your previous one
 * @param {value} id of woto to join
 */
const editDiscussion = async (state, dispatch, changes) => {
  dispatch({ type: actions.SET_LOADING });

  try {
    console.log({ ...state.discussion.description, ...changes });
    const response = await API.editDiscussion(state.discussion._id, {
      description: { ...state.discussion.description, ...changes },
    });
    console.log(response);
    dispatch({ type: actions.SET_DISCUSSION, payload: response });
  } catch (error) {
    console.error(error.response ? error.response.data.message : error);
  }
};

export default {
  joinQueue,
  joinWotoRoom,
  patchMeetingURL,
  submitQuestion,
  editSubmission,
  leaveTAQueue,
  setDiscussions,
  findMyDiscussion,
  postDiscussion,
  archiveDiscussion,
  joinDiscussion,
  leaveDiscussion,
  editDiscussion,
};
