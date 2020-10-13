import API from "../../../api/API";
import { getCommonValues } from "../../../utilfunctions/getCommonValues";
import { getStudentStats } from "../../tahelp/util/stats";

// Action types
const LOADING_SET = "woto/session/LOADING_SET";
const COURSE_FETCH = "woto/session/COURSE_FETCH";
const SESSION_FETCH = "woto/session/SESSION_FETCH";
const STATS_FETCH = "woto/session/QUESTIONS_FETCH";
const ROOMS_FETCH = "woto/session/ROOMS_FETCH";
const PARTICIPANTS_FETCH = "woto/session/PARTICIPANTS_FETCH";


// Reducer
export default (state = {}, action) => {
    switch (action.type) {
        case LOADING_SET:
            return state;
        case COURSE_FETCH:
            return state;
        case SESSION_FETCH:
            return state;
        case STATS_FETCH:
            return state;
        case ROOMS_FETCH:
            return state;
        case PARTICIPANTS_FETCH:
            return state;
        default:
            return state;
    }
};

// Action Creators
// ----------------------STUDENT HELP FUNCTIONS----------------------
// Set the current active session and question (if it exists)
// ***TODO***
export const setupSession = async (state, dispatch, authState) => {
    dispatch({ type: actions.SET_LOADING });

    try {
        // Get active session
        const sessions = await API.getSession(state.course._id);
        dispatch({ type: actions.SET_SESSION, payload: sessions[0] });
        // Get active question
        // const questions = await API.getQuestions(sessions[0]._id)

        const questions = await API.getMyQuestion(state.course._id);
        // Confirm question belongs to user
        console.log(questions);
        const filtered = questions.filter(
            (item) => item.student === authState.user._id
        );
        const stats = getStudentStats(authState.user._id, questions);
        dispatch({ type: actions.SET_STATS, payload: stats });

        console.log(stats);
        if (filtered && filtered.length > 0) {
            dispatch({ type: actions.SET_QUESTION, payload: filtered[0] });
        }
    } catch (error) {
        console.error(error.response ? error.response.data.message : error);
    }
};

// Join the queue but submitting a question with empty description
// ***TODO***
export const joinQueue = async (state, dispatch) => {
    dispatch({ type: actions.SET_LOADING });
    try {
        const question = await API.postQuestion(state.course._id);
        dispatch({ type: actions.SET_QUESTION, payload: question });
        dispatch({
            type: actions.SET_STATS,
            payload: { ...state.stats, position: state.stats.waiting + 1 },
        });
    } catch (error) {
        console.error(error.response ? error.response.data.message : error);
    }
};

// Join the queue but submitting a question with empty description
// ***TODO***
export const joinWotoRoom = async (state, dispatch) => {
    dispatch({ type: actions.JOIN_WOTO_ROOM });
};

// Update the user's meeting url
// ***TODO***
export const patchMeetingURL = async (meetingURL) => {
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
// ***TODO***
export const submitQuestion = async (state, dispatch, values, authState) => {
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
// ***TODO***
export const editSubmission = async (state, dispatch, values) => {
    dispatch({ type: actions.SET_LOADING });

    try {
        // if both question and discussion
        if (
            state.question?.active &&
            state.discussion &&
            !state.discussion.archived
        ) {
            const question = await API.patchQuestion(state.question._id, {
                description: values,
            });
            const discussion = await API.editDiscussion(state.discussion._id, {
                description: values,
            });
            await setDiscussions(state, dispatch);
            dispatch({
                type: actions.EDIT_SUBMISSION,
                payload: { discussion, question },
            });
        }
        // edit ta question if it exists
        if (state.question?.active) {
            const res = await API.patchQuestion(state.question._id, {
                description: values,
            });
            dispatch({ type: actions.SET_QUESTION, payload: res });
        }

        // edit discussion if it exists
        if (state.discussion && !state.discussion.archived) {
            const res = await API.editDiscussion(state.discussion._id, {
                description: values,
            });
            await setDiscussions(state, dispatch);
            dispatch({ type: actions.SET_DISCUSSION, payload: res });
        }
    } catch (error) {
        console.error(error.response ? error.response.data.message : error);
    }
};

// Leave the TA queue and remove discussion from state (but don't archive discussion)
// ***TODO***
export const leaveTAQueue = async (state, dispatch) => {
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
// ***TODO***
export const setDiscussions = async (state, dispatch) => {
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
// ***TODO***
export function checkUserInDiscussion(userId, discussion) {
    var found = false;
    discussion.participants.forEach((item) => {
        if (item.participant === userId && item.active) {
            found = true;
        }
    });
    return found;
}

// Set past discussion for users if it exists
// ***TODO***
export const getPastDiscussion = (state, dispatch, discussions, authState) => {
    discussions.forEach((discussion) => {
        if (discussion.owner._id === authState.user._id) {
            dispatch({ type: actions.SET_DISCUSSION, payload: discussion });
        } else if (checkUserInDiscussion(authState.user._id, discussion)) {
            dispatch({ type: actions.JOIN_DISCUSSION, payload: { discussion } });
        }
    });
};

// Remove all other wotos that match user id
// ***TODO***
export const archiveExistingDiscussions = async (state, dispatch, authState) => {
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
// ***TODO***
export const postDiscussion = async (state, dispatch, values) => {
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
// ***TODO***
export const archiveDiscussion = async (state, dispatch) => {
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
// ***TODO***
export const joinDiscussion = async (state, dispatch, value, authState) => {
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
// ***TODO***
export const leaveDiscussion = async (state, dispatch, value) => {
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
// ***TODO***
export const editDiscussion = async (state, dispatch, changes) => {
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
// ***TODO***
export const markAway = async (state, dispatch, user) => {
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

// ***TODO***
export const joinTAVideoLink = async (state, dispatch) => {
    if (!state.question?.assistant?.description?.studentJoined) {
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
    }
};

// ---------------------------TA HELP FUNCTIONS---------------------------
// add active session to state
// ***TODO***
async function setupSession(state, dispatch, authContext, course) {
    const response = await API.getSession(course._id);
    // get active session
    const session = response[0];

    // if user is already a staffer in the active session
    const joined = findActiveStaffer(session, authContext.state.user).length > 0;
    // set state to session if active
    if (session && session.active) {
        dispatch({
            type: actions.SETUP_SESSION,
            payload: { session: session, joined: joined },
        });
    } else {
        dispatch({ type: actions.STOP_LOADING });
    }
}

// Edit the meeting url of the user into db and context if meeting url is new
// ***TODO***
const patchMeetingUrl = async (state, dispatch, authContext, meetingURL) => {
    if (meetingURL !== authContext.state.user.meetingURL) {
        try {
            const response = await API.editProfile({ meetingURL: meetingURL });
            authContext.dispatch({
                type: userActions.EDIT,
                payload: { user: { ...response } },
            });

            dispatch({ type: actions.CLEAR_MESSAGE });
        } catch (e) {
            let error = e.response.data.message;
            console.error(error);
            dispatch({ type: actions.SET_ERROR, payload: error });
        }
    }
};

// Open a new session
// ***TODO***
const openSession = async (state, dispatch, auth, values) => {
    try {
        const [session] = await Promise.all([
            API.openSession(state.course._id, values),
            patchMeetingUrl(state, dispatch, auth, values.meetingURL),
        ]);

        dispatch({
            type: actions.JOIN_SESSION,
            payload: session,
        });
    } catch (error) {
        dispatch({ type: actions.SET_ERROR, payload: error });
    }
};

// Close a session
// ***TODO***
const closeSession = async (state, dispatch) => {
    try {
        await API.closeSession(state.course?._id);
        //leave
        dispatch({ type: actions.CLOSE_SESSION });
    } catch (error) {
        console.error(error.response.data.message);
        dispatch({ type: actions.SET_ERROR, payload: error });
    }
};

// Return instance of this active staffer if it exists
// ***TODO***
function findActiveStaffer(session, user) {
    if (!session?.staffers || session?.staffers.length === 0) {
        return false;
    }
    const included = session.staffers.filter((item) => item?.id === user._id);
    return included;
}

// Join an existing session
// ***TODO***
const joinSession = async (state, dispatch, auth, values) => {
    if (values.meetingURL) {
        await patchMeetingUrl(state, dispatch, auth, values.meetingURL);
    }

    try {
        const session = API.joinSessionAsStaffer(state.course._id);
        if (session) {
            dispatch({
                type: actions.JOIN_SESSION,
                payload: session,
            });
        } else {
            dispatch({
                type: actions.SET_ERROR,
                payload: "Unable to join session. Please refresh the page",
            });
        }
    } catch (error) {
        dispatch({
            type: actions.SET_ERROR,
            payload: error.response.data.message,
        });
    }
};

// sign out of session without closing it
// ***TODO***
const signOff = async (state, dispatch, auth) => {
    const staffers = state.session.staffers.filter(
        (item) => item.id !== auth.state.user._id
    );

    let session = await API.editSession(state.course._id, { staffers: staffers });

    dispatch({
        type: actions.LEAVE_SESSION,
        payload: session,
    });
};

// ***TODO***
const closeAnnouncement = (state, dispatch, auth, announcement) => {
    const temp = state.session.announcements.filter(
        (item) => item._id !== announcement._id
    );

    editSession({
        announcements: temp,
    });
};

// ***TODO***
const pinAnnnouncement = async (state, dispatch, auth, announcement) => {
    try {
        const response = await API.editCourse(state.course._id, {
            pinnedAnnouncements: announcement,
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

// ***TODO***
const makeAnnouncement = (state, dispatch, auth, message) => {
    const change = {
        announcements: [
            {
                announcement: message,
                ownerId: auth?.state.user._id,
                ownerName: auth?.state.user.name,
            },
            ...state.session?.announcements,
        ],
    };
    editSession(change);
};

/**
 * edit a session's attributes with
 * @param {*} values edits to make
 */
// ***TODO***
const editSession = async (state, dispatch, auth, values) => {
    const { meetingURL, ...changes } = values;
    try {
        if (meetingURL) {
            await patchMeetingUrl(state, dispatch, auth, values.meetingURL);
        }
        const session = await API.editSession(state.course._id, changes);
        dispatch({
            type: actions.EDIT_SESSION,
            payload: session,
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: actions.SET_ERROR,
            payload: "Error occured in editing session",
        });
    }
    dispatch({
        type: actions.SET_SUCCESS,
        payload: "Error occured in editing session",
    });
};

// add self to question and set question to state
// ***TODO***
function helpStudent(state, dispatch, question) { }