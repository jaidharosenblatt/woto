import React, { createContext, useReducer } from "react";
import API from "../../api/API";

const initialState = {
  course: {},
};

export const actions = {
  JOIN_QUEUE: "JOIN_QUEUE",
  CREATE_QUESTION: "CREATE_QUESTION",
  EDIT_SUBMISSION: "EDIT_SUBMISSION",
  ARCHIVE_QUESTION: "ARCHIVE_QUESTION",
  JOIN_WOTO_ROOM: "JOIN_WOTO_ROOM",
  CREATE_DISCUSSION: "CREATE_DISCUSSION",
  ARCHIVE_DISCUSSION: "ARCHIVE_DISCUSSION",
  JOIN_DISCUSSION: "JOIN_DISCUSSION",
  LEAVE_DISCUSSION: "LEAVE_DISCUSSION",
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

// Remove all other wotos that match user id
const archiveExistingDiscussions = async (user, course) => {
  const discussions = await API.getWotoData(course._id);
  discussions.forEach(async (discussion) => {
    // check if matches the current user
    if (!discussion.archived && discussion.owner._id === user._id) {
      const res = await API.editDiscussion(discussion._id, {
        archived: true,
      });
      console.log("Archiving Discussion", res);
    }
  });
};

const reducer = async (state, action) => {
  const activeQuestion = state.question && !state.question.archived;
  const activeDiscussion = state.discussion && !state.discussion.archived;
  const description = action.payload && action.payload.description;

  switch (action) {
    // Join queue by submitting a blank discussion
    case actions.JOIN_QUEUE:
      try {
        const response = await API.postQuestion(state.course._id);
        return {
          ...state,
          description: response.description,
          question: response,
        };
      } catch (error) {
        throw new Error(error.response ? error.response.data.message : error);
      }

    // Navigate to woto room without an active submission
    case actions.JOIN_WOTO_ROOM:
      return { ...state, discussion: { archived: true } };
    // Submit a question for TA
    case actions.CREATE_QUESTION:
      try {
        // if there is a meeting url then they wanted to join woto
        if (description.meetingURL) {
          await patchMeetingURL(description.meetingURL);
        }
        const [response] = await Promise.all([
          API.patchQuestion(state.question._id, {
            description: description,
          }),
          archiveExistingDiscussions(), // archive other Wotos
        ]);

        return {
          ...state,
          description: response.description,
          question: response,
        };
      } catch (error) {
        throw new Error(error.response ? error.response.data.message : error);
      }
    // Edit both discussion and question if they exist
    case actions.EDIT_SUBMISSION:
      try {
        let question;
        let discussion;

        if (activeQuestion) {
          question = API.patchQuestion(state.question._id, {
            description: description,
          });
        }
        if (activeDiscussion) {
          discussion = API.editDiscussion(state.question._id, {
            description: description,
          });
        }

        return {
          ...state,
          question: activeQuestion ? question : state.question,
          discussion: activeDiscussion ? discussion : state.discussion,
          description: description,
        };
      } catch (error) {
        throw new Error(error.response ? error.response.data.message : error);
      }
    // Archive a question (and discussion if it exists)
    case actions.ARCHIVE_QUESTION:
      try {
        let discussion;
        if (activeDiscussion) {
          discussion = await API.editDiscussion(state.discussion._id, {
            archived: true,
          });
        }
        const question = await API.patchQuestion(state.question._id, {
          active: false,
        });

        return {
          ...state,
          question: question,
          discussion: activeDiscussion ? discussion : state.discussion,
          description: description,
        };
      } catch (error) {
        throw new Error(error.response ? error.response.data.message : error);
      }
    case actions.CREATE_DISCUSSION:
      if (description.meetingURL) {
        await patchMeetingURL(description.meetingURL); // update meeting room link
      }
      try {
        const response = await API.askWotoQuestion(state.course._id, {
          description: { ...state.description, ...description },
        });
        return {
          ...state,
          discussion: response,
          description: response.description,
        };
      } catch (error) {
        throw new Error(error.response ? error.response.data.message : error);
      }
    // Archive the current discussion
    case actions.ARCHIVE_DISCUSSION:
      try {
        const response = await API.editDiscussion(state.discussion._id, {
          archived: true,
        });
        return {
          ...state,
          discussion: response,
          description: response.description,
        };
      } catch (error) {
        throw new Error(error.response ? error.response.data.message : error);
      }
    // Join someone else's discussion
    case actions.JOIN_DISCUSSION:
      try {
        await Promise.all([
          API.joinDiscussion(action.payload.discussion.id),
          archiveExistingDiscussions(),
        ]);
        return {
          ...state,
          discussionParticipant: action.payload.discussion,
        };
      } catch (error) {
        throw new Error(error.response ? error.response.data.message : error);
      }
    // Leave someone else's discussion
    case actions.LEAVE_DISCUSSION:
      return {
        ...state,
        discussionParticipant: undefined,
      };
    default:
      return state;
  }
};
export const HelpContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    course: props.course,
  });

  console.log(state);

  return (
    <HelpContext.Provider value={{ state, dispatch }}>
      {props.children}
    </HelpContext.Provider>
  );
};

export const HelpContext = createContext(initialState);
