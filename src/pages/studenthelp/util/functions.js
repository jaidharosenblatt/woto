import API from "../../../api/API";
import { actions } from "./actions";
import { getCommonValues } from "../../../utilfunctions/getCommonValues";

// Set the current active session and question (if it exists)
const setupSession = async (state, dispatch, authState) => {
  dispatch({ type: actions.SET_LOADING });

  try {
    // Get active session
    const sessions = await API.getSession(state.course._id);
    dispatch({ type: actions.SET_SESSION, payload: sessions[0] });
    // Get active question
    const questions = await API.getMyQuestion(state.course._id);
    // Confirm question belongs to user
    const filtered = questions.filter(
      (item) => item.student === authState.user._id
    );
    if (filtered && filtered.length > 0) {
      dispatch({ type: actions.SET_QUESTION, payload: filtered[0] });
    }
  } catch (error) {
    console.error(error.response ? error.response.data.message : error);
  }
};

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
  console.log("updating url");
  try {
    let res = await API.editProfile({ meetingURL: meetingURL });
    console.log(res);
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
    const res = await API.getDiscussions(state.course._id);
    const discussions = res.filter((discussion) => !discussion.archived);
    dispatch({ type: actions.SET_DISCUSSIONS, payload: discussions });
    return discussions;
  } catch (error) {
    console.error(error.response ? error.response.data.message : error);
  }
};

// Check if userId found in active discussion participants
function checkUserInDiscussion(userId, discussion) {
  var found = false;
  discussion.participants.forEach((item) => {
    if (item.participant === userId && item.active) {
      found = true;
    }
  });
  return found;
}

// Set past discussion for users if it exists
const getPastDiscussion = (state, dispatch, discussions, authState) => {
  discussions.forEach((discussion) => {
    if (discussion.owner._id === authState.user._id) {
      dispatch({ type: actions.SET_DISCUSSION, payload: discussion });
    } else if (checkUserInDiscussion(authState.user._id, discussion)) {
      dispatch({ type: actions.JOIN_DISCUSSION, payload: { discussion } });
    }
  });
};

// Remove all other wotos that match user id
const archiveExistingDiscussions = async (state, dispatch, authState) => {
  const discussions = await API.getDiscussions(state.course._id);
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

// Post a new discussion
const postDiscussion = async (state, dispatch, values) => {
  dispatch({ type: actions.SET_LOADING });

  if (values.meetingURL) {
    await patchMeetingURL(values.meetingURL); // update meeting room link
  }
  try {
    const response = await API.postDiscussion(state.course._id, {
      description: { ...state.description, ...values }, // add values to existing description
    });
    await setDiscussions(state, dispatch);

    dispatch({
      type: actions.SET_DISCUSSION,
      payload: response,
    });
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
    await setDiscussions(state, dispatch);
    // Reset description to question's or undefined
    const description = state.question?.description;
    dispatch({
      type: actions.ARCHIVE_DISCUSSION,
      payload: { discussion: response, description: description },
    });
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
      API.joinDiscussion(value._id),
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
  try {
    await Promise.all([API.leaveDiscussion(value._id)]);
  } catch (error) {
    console.error(error.response ? error.response.data.message : error);
  }
};

/**
 * Join a Woto and leave your previous one
 * @param {value} id of woto to join
 */
const editDiscussion = async (state, dispatch, changes) => {
  dispatch({ type: actions.SET_LOADING });

  if (changes.meetingURL) {
    await patchMeetingURL(changes.meetingURL); // update meeting room link
  }

  try {
    const response = await API.editDiscussion(state.discussion._id, {
      description: { ...state.discussion.description, ...changes },
    });
    await setDiscussions(state, dispatch);
    dispatch({ type: actions.SET_DISCUSSION, payload: response });
  } catch (error) {
    console.error(error.response ? error.response.data.message : error);
  }
};

/**
 * Mark a user as inactive
 * @param user to kick
 */
const markAway = async (state, dispatch, user) => {
  dispatch({ type: actions.SET_LOADING });
  const temp = state.discussion.participants.map((item) => {
    if (item.participant === user.participant) {
      return { ...item, active: false };
    }
    return item;
  });
  console.log(temp);

  try {
    const response = await API.editDiscussion(state.discussion._id, {
      participants: temp,
    });
    await setDiscussions(state, dispatch);
    dispatch({ type: actions.SET_DISCUSSION, payload: response });
  } catch (error) {
    console.error(error.response ? error.response.data.message : error);
  }
};

const joinTAVideoLink = async (state, dispatch) => {
  dispatch({ type: actions.SET_LOADING });
  var temp = state.question.assistant.description;
  temp = { ...temp, studentJoined: new Date() };

  try {
    const res = await API.patchQuestion(state.question._id, {
      assistant: { description: temp, id: state.question.assistant.id },
    });

    dispatch({ type: actions.SET_QUESTION, payload: res });
  } catch (error) {
    console.log(error);
  }
};

export default {
  setupSession,
  joinQueue,
  joinWotoRoom,
  patchMeetingURL,
  submitQuestion,
  editSubmission,
  leaveTAQueue,
  setDiscussions,
  getPastDiscussion,
  postDiscussion,
  archiveDiscussion,
  joinDiscussion,
  leaveDiscussion,
  editDiscussion,
  markAway,
  joinTAVideoLink,
};
