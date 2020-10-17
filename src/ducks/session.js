import _ from 'lodash';
import API from "../api/API";
import { getStudentStats } from "../pages/tahelp/util/stats";

// Action types
const LOADING_SET = "woto/session/LOADING_SET";
const COURSES_FETCH = "woto/session/COURSES_FETCH";
const COURSE_FETCH = "woto/session/COURSE_FETCH";
const SESSION_FETCH = "woto/session/SESSION_FETCH";
const DISCUSSIONS_FETCH = "woto/session/DISCUSSIONS_FETCH";
const ACTIVE_DISCUSSION_FETCH = "woto/session/ACTIVE_DISCUSSION_FETCH";

// Reducer
export default (state = { loading: false, courses: [] }, action) => {
    switch (action.type) {
        case LOADING_SET: // action.payload is boolean
            return {
                ...state,
                loading: action.payload
            };

        case COURSES_FETCH: // action.payload is courses[]
            return {
                ...state,
                courses: action.payload
            };

        case COURSE_FETCH: {// action.payload is course
            const i = _.findIndex(state.courses, { _id: action.payload._id });
            let newState = { ...state };
            // Add new course to courses[] if course doesn't already exist, else update course
            if (i > -1) {
                newState.courses[i] = action.payload;
            } else {
                newState.courses = [...newState.courses, action.payload]
            }
            return newState;
        }
        case SESSION_FETCH: {// action.payload is session
            const i = _.findIndex(state.courses, { _id: action.payload.course });
            let newState = { ...state };
            // Fetch session for given course ID if the course has already been loaded
            if (i > -1) {
                newState.courses[i].session = action.payload;
            }
            return newState;
        }
        case DISCUSSIONS_FETCH: {// action.payload is discussions[]
            const i = _.findIndex(state.courses, { _id: action.payload[0].course });
            let newState = { ...state };
            // Fetch discussions for given course ID if the course has already been loaded         
            if (i > -1) {
                newState.courses[i].discussions = action.payload;
            }
            return newState;
        }
        case ACTIVE_DISCUSSION_FETCH: {// action.payload is activeDiscussion
            const i = _.findIndex(state.courses, { _id: action.payload?.course });
            let newState = { ...state };
            // Set the active discussion in a user's woto room window         
            if (i > -1) {
                newState.courses[i].activeDiscussion = action.payload;
            }
            return newState;
        }
        default:
            return state;
    }
};

// Action Creators
// --------------------------FETCHERS AND HELPERS----------------------------------
/**
 * Fetch the active session for the given course if there is one
 * @param {*} courseID 
 * @param {*} userID 
 */
const fetchSession = (courseID, userID, TA = false) => async dispatch => {
    try {
        const sessions = await API.getSession(courseID);

        // Do nothing if there are no active sessions
        if (!sessions[0].active) {
            return;
        }

        // If the user is a student
        if (!TA){
            // If there is an active session, retrieve all relevant information
            const questions = await API.getMyQuestion(courseID);
            const stats = getStudentStats(userID, questions);

            // Confirm question belongs to user
            const filtered = questions.filter(
                (item) => item.student === userID
            );

            const activeQuestion = (filtered && filtered.length > 0) ? filtered[0] : null;

            dispatch({
                type: SESSION_FETCH,
                payload: { ...sessions[0], stats, activeQuestion }
            });
        }

        // If the user is a TA
        if (TA) {

        }

        
    } catch (error) {
        console.error(error.response ? error.response.data.message : error);
    }
};

/**
 * Fetch the discussions for a given course as well as the user's active discussion
 * @param {*} courseID 
 */
const fetchDiscussions = (courseID, userID) => async dispatch => {
    try {
        const discussions = await API.getDiscussions(courseID);
        
        // If there are any discussions
        if (discussions && discussions.length > 0) {
            dispatch({
                type: DISCUSSIONS_FETCH,
                payload: discussions
            });

            const activeDiscussion = userParticipantOf(discussions, userID);

            dispatch({
                type: ACTIVE_DISCUSSION_FETCH,
                payload: activeDiscussion
            });
        }
    } catch (error) {
        console.error(error.response ? error.response.data.message : error);
    }
};

/**
 * Fetch all information for a given course, memoized so we can call this whenever user navigates to a
 * course's page without fear of time inefficiency.
 * @param {*} courseID 
 * @param {*} userID 
 */
const fetchCourse = (courseID, userID) => async dispatch => _fetchCourse(courseID, userID, dispatch);
const _fetchCourse = _.memoize(async (courseID, userID, dispatch) => {
    try {
        const courses = await API.getCourses();
        let i = _.findIndex(courses, {_id: courseID});
        if (i > -1) {
            const course = courses[i];
            dispatch({
                type: COURSE_FETCH,
                payload: course
            });

            await dispatch(fetchSession(courseID, userID));
            await dispatch(fetchDiscussions(courseID, userID));
        }
    } catch (error) {
        console.error(error.response ? error.response.data.message : error);
    }
});

/**
 * Fetch the information for all courses in the given array
 * @param {[]} courseIDs 
 * @param {*} userID 
 */
const fetchCourses = (courseIDs, userID) => async dispatch => {
    for (const courseID of courseIDs) {
        await dispatch(fetchCourse(courseID, userID));
    }
};

/**
 * Return a discussion if a user is a participant in it (can also mean that they own it)
 * @param {*} discussions 
 * @param {*} userID 
 */
const userParticipantOf = (discussions, userID) => {
    const activeDiscussions = discussions.filter((discussion) => discussion.archived === false);

    for (const discussion of activeDiscussions) {
        for (const participant of discussion.participants) {
            if (participant.participant === userID){
                return discussion;
            }
        }
    }

    return null;
};


// ----------------------STUDENT FUNCTIONS----------------------
/**
 * Loads all courses into cache
 * @param {[]} courseIDs 
 * @param {*} userID 
 */
export const loadCourses = (courseIDs, userID) => async (dispatch, getState) => {
    dispatch({ type: LOADING_SET, payload: true });

    await dispatch(fetchCourses(courseIDs, userID));

    dispatch({ type: LOADING_SET, payload: false });

    console.log(getCourseIndex(getState(), courseIDs[0]));
};

/**
 * Loads one course into cache
 * @param {*} courseID 
 * @param {*} userID 
 */
export const loadCourse = (courseID, userID) => async (dispatch) => {
    dispatch({ type: LOADING_SET, payload: true });

    await dispatch(fetchCourse(courseID, userID));

    dispatch({ type: LOADING_SET, payload: false });
};
 
/**
 * When the user first loads a course and needs to retrieve information about a session to see if there is an active one or not
 * @param {*} courseID 
 * @param {*} userID 
 * @param {*} TA 
 */
export const loadSession = (courseID, userID, TA = false) => async (dispatch) => {
    dispatch({ type: LOADING_SET, payload: true });

    await dispatch(fetchSession(courseID, userID, TA));

    dispatch({ type: LOADING_SET, payload: false });
};

/**
 * Join the queue in a session
 * @param {*} courseID 
 * @param {*} userID 
 */
export const joinQueue = (courseID, userID) => async (dispatch, getState) => {
    dispatch({ type: LOADING_SET, payload: true });

    try {
        await API.postQuestion(courseID);

        await dispatch(fetchSession(courseID, userID));

    } catch (error) {
        console.error(error.response ? error.response.data.message : error);
    } finally {
        dispatch({ type: LOADING_SET, payload: false });
    }    
};

/**
 * Leave the queue in a session
 * @param {*} courseID 
 * @param {*} userID 
 */
export const leaveQueue = (courseID, userID) => async (dispatch, getState) => {
    dispatch({ type: LOADING_SET, payload: true });

    try {
        // Get question to set as inactive if user is in a session's queue
        let i = _.findIndex(getState().courses, {_id: courseID});
        if (i > -1) {
            const question = getState().courses[i].session?.activeQuestion;

            // Set the question as inactive 
            if (question) {
                await API.patchQuestion(question._id, {
                    active: false,
                });

                // Fetch new session info
                await dispatch(fetchSession(courseID, userID));
            }
        }
    } catch (error) {
        console.error(error.response ? error.response.data.message : error);
    } finally {
        dispatch({ type: LOADING_SET, payload: false });
    }
};

/**
 * Update the user's meeting url
 * @param {*} meetingURL 
 */
export const setMeetingURL = async (meetingURL) => {
    console.log("updating url");
    try {
        let res = await API.editProfile({ meetingURL: meetingURL });
        console.log(res);
    } catch (error) {
        console.error(error.response ? error.response.data.message : error);
    }
};

/**
 * Submit a question for an active session
 * @param {*} courseID 
 * @param {*} userID 
 * @param {*} questionID 
 * @param {*} questionDescription 
 */
export const submitQuestion = (courseID, userID, questionID, questionDescription) => async (dispatch) => {
    dispatch({ type: LOADING_SET, payload: true });

    try {
        await API.patchQuestion(questionID, {description: questionDescription});

        await dispatch(fetchSession(courseID, userID));

    } catch (error) {
        console.error(error.response ? error.response.data.message : error);
    } finally {
        dispatch({ type: LOADING_SET, payload: false });
    }
};

/**
 * Edit question while in a session. If it's also a discussion, edit that too.
 * @param {*} courseID 
 * @param {*} userID 
 * @param {*} questionID 
 * @param {*} questionDescription 
 */
export const editQuestion = (courseID, userID, questionID, questionDescription) => async (dispatch, getState) => {
    dispatch({ type: LOADING_SET, payload: true });

    try {
        // Edit the question
        await API.patchQuestion(questionID, {description: questionDescription});
        await dispatch(fetchSession(courseID, userID));

        // Check if it's also a discussion description
        let i = _.findIndex(getState().courses, {_id: courseID});
        if (i > -1) {
            const activeDiscussion = getState().courses[i].activeDiscussion;
            if (activeDiscussion?.owner === userID) {
                await API.editDiscussion(activeDiscussion._id, {description: questionDescription});
                await dispatch(fetchDiscussions(courseID, userID));
            }
        }
    } catch (error) {
        console.error(error.response ? error.response.data.message : error);
    } finally {
        dispatch({ type: LOADING_SET, payload: false });
    }
};

/**
 * Load the discussions for a given course into cache
 * @param {*} courseID 
 * @param {*} userID 
 */
export const loadDiscussions = (courseID, userID) => async dispatch => {
    dispatch({ type: LOADING_SET, payload: true });

    await dispatch(fetchDiscussions(courseID, userID));

    dispatch({ type: LOADING_SET, payload: false });
};


/**
 * Post a discussion to a given course
 * @param {*} courseID 
 * @param {*} userID 
 * @param {*} discussionDescription 
 */
export const postDiscussion = (courseID, userID, discussionDescription, meetingURL) => async dispatch => {
    dispatch({ type: LOADING_SET, payload: true });

    try {
        await API.postDiscussion(courseID, {description: {discussionDescription}});
        
        if (meetingURL) {
            await setMeetingURL(meetingURL);
        }
    } catch (error) {
        console.error(error.response ? error.response.data.message : error);
    } finally {
        await dispatch(fetchDiscussions(courseID, userID));
        dispatch({ type: LOADING_SET, payload: false });
    }
};

/**
 * Close/archive a discussion
 * @param {*} courseID 
 * @param {*} userID 
 * @param {*} discussionID 
 */
export const closeDiscussion = (courseID, userID, discussionID, waitReload = false) => async dispatch => {
    if (!waitReload) {
        dispatch({ type: LOADING_SET, payload: true });
    }
    try {
        await API.editDiscussion(discussionID, {archived: true});
    } catch (error) {
        console.error(error.response ? error.response.data.message : error);
    } finally {
        await dispatch(fetchDiscussions(courseID, userID));
        if (!waitReload) {
            dispatch({ type: LOADING_SET, payload: false });
        }
    }
};

/**
 * Close/archive all active discussions for a given user
 * @param {*} userID 
 */
export const closeAllDiscussions = (userID) => async dispatch => {
    dispatch({ type: LOADING_SET, payload: true });
    try {
        const courses = await API.getCourses();

        for (const course of courses) {
            const discussions = API.getDiscussions(course._id);
            for (const discussion of discussions) {
                if (discussion.owner === userID) {
                    await dispatch(closeDiscussion(course._id, userID, discussion._id, true));
                }
            }
        }
    } catch {

    } finally {
        dispatch({ type: LOADING_SET, payload: false });
    }
};

/**
 * Edit a user's discussion's description
 * @param {*} courseID 
 * @param {*} userID 
 * @param {*} discussionID 
 * @param {*} newDescription 
 */
export const editDiscussion = (courseID, userID, discussionID, newDescription) => async dispatch => {
    dispatch({ type: LOADING_SET, payload: true });

    try {
        await API.editDiscussion(discussionID, {description: newDescription});
    } catch (error) {
        console.error(error.response ? error.response.data.message : error);
    } finally {
        await dispatch(fetchDiscussions(courseID, userID));
        dispatch({ type: LOADING_SET, payload: false });
    }
};

/**
 * Add user as a partcipant to a discussion
 * @param {*} courseID 
 * @param {*} userID 
 * @param {*} discussionID 
 */
export const joinDiscussion = (courseID, userID, discussionID) => async dispatch => {
    dispatch({ type: LOADING_SET, payload: true });

    try {
        await API.joinDiscussion(discussionID);
    } catch (error) {
        console.error(error.response ? error.response.data.message : error);
    } finally {
        await dispatch(fetchDiscussions(courseID, userID));
        dispatch({ type: LOADING_SET, payload: false });
    }
};

/**
 * Remove user from a discussion
 * @param {*} courseID 
 * @param {*} userID 
 * @param {*} discussionID 
 */
export const leaveDiscussion = (courseID, userID, discussionID) => async dispatch => {
    dispatch({ type: LOADING_SET, payload: true });

    try {
        await API.leaveDiscussion(discussionID);
    } catch (error) {
        console.error(error.response ? error.response.data.message : error);
    } finally {
        await dispatch(fetchDiscussions(courseID, userID));
        dispatch({ type: LOADING_SET, payload: false });
    }
};

/**
 * Get the index of a course in state.session.courses by courseID
 * @param {*} session - entire session state
 * @param {*} courseID 
 */
export const getCourseIndex = (session, courseID) => {
    const i = _.findIndex(session.courses, {_id: courseID});
    return i > -1 ? i : null;
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


// // ***TODO***
// export const joinTAVideoLink = async (state, dispatch) => {
//     if (!state.question?.assistant?.description?.studentJoined) {
//         dispatch({ type: actions.SET_LOADING });
//         var temp = state.question.assistant.description;
//         temp = { ...temp, studentJoined: new Date() };

//         try {
//             const res = await API.patchQuestion(state.question._id, {
//                 assistant: { description: temp, id: state.question.assistant.id },
//             });

//             dispatch({ type: actions.SET_QUESTION, payload: res });
//         } catch (error) {
//             console.log(error);
//         }
//     }
// };





// // ---------------------------TA FUNCTIONS---------------------------
// add active session to state
// ***TODO***
// async function setupSession(state, dispatch, authContext, course) {
//     const response = await API.getSession(course._id);
//     // get active session
//     const session = response[0];

//     // if user is already a staffer in the active session
//     const joined = findActiveStaffer(session, authContext.state.user).length > 0;
//     // set state to session if active
//     if (session && session.active) {
//         dispatch({
//             type: actions.SETUP_SESSION,
//             payload: { session: session, joined: joined },
//         });
//     } else {
//         dispatch({ type: actions.STOP_LOADING });
//     }
// }

// export const loadSessionTA = (courseID, userID) => async dispatch => {
//     dispatch({ type: LOADING_SET, payload: true });
//     try {

//     } catch {

//     } finally {
//         dispatch({ type: LOADING_SET, payload: true });
//     }
// };

// // Edit the meeting url of the user into db and context if meeting url is new
// // ***TODO***
// const patchMeetingUrl = async (state, dispatch, authContext, meetingURL) => {
//     if (meetingURL !== authContext.state.user.meetingURL) {
//         try {
//             const response = await API.editProfile({ meetingURL: meetingURL });
//             authContext.dispatch({
//                 type: userActions.EDIT,
//                 payload: { user: { ...response } },
//             });

//             dispatch({ type: actions.CLEAR_MESSAGE });
//         } catch (e) {
//             let error = e.response.data.message;
//             console.error(error);
//             dispatch({ type: actions.SET_ERROR, payload: error });
//         }
//     }
// };

// // Open a new session
// // ***TODO***
// const openSession = async (state, dispatch, auth, values) => {
//     try {
//         const [session] = await Promise.all([
//             API.openSession(state.course._id, values),
//             patchMeetingUrl(state, dispatch, auth, values.meetingURL),
//         ]);

//         dispatch({
//             type: actions.JOIN_SESSION,
//             payload: session,
//         });
//     } catch (error) {
//         dispatch({ type: actions.SET_ERROR, payload: error });
//     }
// };

// // Close a session
// // ***TODO***
// const closeSession = async (state, dispatch) => {
//     try {
//         await API.closeSession(state.course?._id);
//         //leave
//         dispatch({ type: actions.CLOSE_SESSION });
//     } catch (error) {
//         console.error(error.response.data.message);
//         dispatch({ type: actions.SET_ERROR, payload: error });
//     }
// };

// // Return instance of this active staffer if it exists
// // ***TODO***
// function findActiveStaffer(session, user) {
//     if (!session?.staffers || session?.staffers.length === 0) {
//         return false;
//     }
//     const included = session.staffers.filter((item) => item?.id === user._id);
//     return included;
// }

// // Join an existing session
// // ***TODO***
// const joinSession = async (state, dispatch, auth, values) => {
//     if (values.meetingURL) {
//         await patchMeetingUrl(state, dispatch, auth, values.meetingURL);
//     }

//     try {
//         const session = API.joinSessionAsStaffer(state.course._id);
//         if (session) {
//             dispatch({
//                 type: actions.JOIN_SESSION,
//                 payload: session,
//             });
//         } else {
//             dispatch({
//                 type: actions.SET_ERROR,
//                 payload: "Unable to join session. Please refresh the page",
//             });
//         }
//     } catch (error) {
//         dispatch({
//             type: actions.SET_ERROR,
//             payload: error.response.data.message,
//         });
//     }
// };

// // sign out of session without closing it
// // ***TODO***
// const signOff = async (state, dispatch, auth) => {
//     const staffers = state.session.staffers.filter(
//         (item) => item.id !== auth.state.user._id
//     );

//     let session = await API.editSession(state.course._id, { staffers: staffers });

//     dispatch({
//         type: actions.LEAVE_SESSION,
//         payload: session,
//     });
// };

// // ***TODO***
// const closeAnnouncement = (state, dispatch, auth, announcement) => {
//     const temp = state.session.announcements.filter(
//         (item) => item._id !== announcement._id
//     );

//     editSession({
//         announcements: temp,
//     });
// };

// // ***TODO***
// const pinAnnnouncement = async (state, dispatch, auth, announcement) => {
//     try {
//         const response = await API.editCourse(state.course._id, {
//             pinnedAnnouncements: announcement,
//         });
//         console.log(response);
//     } catch (error) {
//         console.log(error);
//     }
// };

// // ***TODO***
// const makeAnnouncement = (state, dispatch, auth, message) => {
//     const change = {
//         announcements: [
//             {
//                 announcement: message,
//                 ownerId: auth?.state.user._id,
//                 ownerName: auth?.state.user.name,
//             },
//             ...state.session?.announcements,
//         ],
//     };
//     editSession(change);
// };

// /**
//  * edit a session's attributes with
//  * @param {*} values edits to make
//  */
// // ***TODO***
// const editSession = async (state, dispatch, auth, values) => {
//     const { meetingURL, ...changes } = values;
//     try {
//         if (meetingURL) {
//             await patchMeetingUrl(state, dispatch, auth, values.meetingURL);
//         }
//         const session = await API.editSession(state.course._id, changes);
//         dispatch({
//             type: actions.EDIT_SESSION,
//             payload: session,
//         });
//     } catch (error) {
//         console.error(error);
//         dispatch({
//             type: actions.SET_ERROR,
//             payload: "Error occured in editing session",
//         });
//     }
//     dispatch({
//         type: actions.SET_SUCCESS,
//         payload: "Error occured in editing session",
//     });
// };

// // add self to question and set question to state
// // ***TODO***
// function helpStudent(state, dispatch, question) { }