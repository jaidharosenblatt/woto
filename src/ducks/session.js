// Action types - StudentHelp
const SET_SESSION = "woto/session/SET_SESSION";
const SET_LOADING = "woto/session/SET_LOADING";
const SET_QUESTION = "woto/session/SET_QUESTION";
const SET_STATS = "woto/session/SET_STATS";
const JOIN_WOTO_ROOM = "woto/session/JOIN_WOTO_ROOM";
const SET_SUBMISSION = "woto/session/EDIT_SUBMISSION";
const SET_DISCUSSIONS = "woto/session/SET_DISCUSSIONS";
const SET_DISCUSSION = "woto/session/SET_DISCUSSION";
const ARCHIVE_DISCUSSION = "woto/session/ARCHIVE_DISCUSSION";
const JOIN_DISCUSSION = "woto/session/JOIN_DISCUSSION";
const LEAVE_DISCUSSION = "woto/session/LEAVE_DISCUSSION";

// Action types - TAHelp


// Reducer
export default (state = {}, action) => {
    switch (action.type) {
        case SET_SESSION:
            return {
                ...state,
                session: action.payload,
            };

        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };

        case SET_QUESTION:
            return {
                ...state,
                question: action.payload,
            };

        case SET_STATS:
            return {
                ...state,
                stats: action.payload,
            };

        case JOIN_WOTO_ROOM:
            return {
                ...state,
                discussion: { archived: true },
            };

        case SET_SUBMISSION:
            return {
                ...state,
                question: action.payload.question,
                discussion: action.payload.discussion,
                description: action.payload.question.description,
            };

        case SET_DISCUSSIONS:
            return {
                ...state,
                discussions: action.payload,
            };

        case SET_DISCUSSION:
            return {
                ...state,
                description: action.payload.description,
                discussion: action.payload,
            };

        // Archive active discussion
        case SET_ARCHIVE:
            return {
                ...state,
                description: action.payload.description,
                discussion: action.payload.discussion,
            };

        // Join someone else's discussion
        case JOIN_DISCUSSION:
            return {
                ...state,
                discussion: { ...state.discussion, archived: true },
                discussionParticipant: action.payload.discussion,
                commonValues: action.payload.commonValues,
            };
        // Leave someone else's discussion
        case LEAVE_DISCUSSION:
            return {
                ...state,
                discussionParticipant: undefined,
            };
        default:
            return state;
    }
};

// Action Creators
