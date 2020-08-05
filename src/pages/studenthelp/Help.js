import React, { useState, useEffect, useContext } from "react";

import API from "../../api/API";
import JoinQueue from "./JoinQueue";
import WotoRoom from "./wotos/WotoRoom";
import SubmitQuestion from "./ActiveSession";
import { AuthContext } from "../../contexts/AuthContext";
/**
 * @jaidharosenblatt Wrapper page for the student help process for both Woto rooms
 * and for submitting a question for a TA queue. Uses state variables to hold the current
 * stage of the problem and passes down as props to all of the pages. Decided to use
 * hooks instead of context for readability
 *
 * @param {course} code course code to display on various help pages
 * @param {course} activeSession the key of the active session if it exists
 */
const Help = ({ course }) => {
  const { state } = useContext(AuthContext);

  // const temp = {
  //   assignment: ["test"],
  //   stage: "Just started the problem",
  //   concepts: ["Linked List"],
  //   details: "hi there",
  // };
  // const [description, setDescription] = useState(temp); // the fields related to the question

  // const [question, setQuestion] = useState({
  //   description: temp,
  //   createdAt: new Date(),
  // });

  const [question, setQuestion] = useState(); // the question for TA queue
  const [description, setDescription] = useState(); // the fields related to the question
  const [discussion, setDiscussion] = useState(); // the submission for Woto Room
  const [discussionParticipant, seDiscussionParticipant] = useState(); // the woto room user joined

  const [session, setSession] = useState([]);

  useEffect(() => {
    async function getSession() {
      const res = await API.getSession(course._id);
      setSession(res[0]);
    }

    if (course.activeSession) {
      getSession();
    }
  }, [course]);

  // Join the queue but submitting a question with empty description
  const joinQueue = async () => {
    try {
      const response = await API.postQuestion(course._id);
      setDescription(response.description);
      setQuestion(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Update the user's meeting url
  const patchMeetingURL = async (meetingURL) => {
    try {
      await API.editProfile({ meetingURL: meetingURL });
      // dispatch({
      //   type: "EDIT",
      //   payload: { user: { ...response } },
      // });
    } catch (error) {
      console.log(error);
    }
  };

  // Submit a question for an active session
  const submitQuestion = async (values) => {
    setDescription(values);

    try {
      // if there is a meeting url then they wanted to join woto
      if (values.meetingURL) {
        await archiveExistingDiscussions(); // archive other Wotos
        await Promise.all([
          postDiscussion(values), // only submit if not already in woto room
          patchMeetingURL(values.meetingURL), // update meeting room link
        ]);
      }
      const response = await API.patchQuestion(question._id, {
        description: values,
      });
      setQuestion(response);
      console.log("Submitted Question", response);
    } catch (error) {
      console.log(error);
    }
  };

  // Edit TA question and discussion
  const editQuestion = async (values) => {
    setDescription(values);
    try {
      const [questionRes, discussionRes] = await Promise.all([
        API.patchQuestion(question._id, {
          description: values,
        }),
        API.editDiscussion(discussion._id, {
          description: values,
        }),
      ]);

      setQuestion(questionRes);
      setDiscussion(discussionRes);

      console.log("Edited TA Question", question);
    } catch (error) {
      console.log(error);
    }
  };

  // Leave the TA queue and remove discussion from state (but don't archive discussion)
  const leaveTAQueue = async () => {
    try {
      const response = await API.patchQuestion(question._id, { active: false });
      console.log("Left TA queue", response);
      // reset discussion and question
      setQuestion(undefined);
      setDiscussion(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  // Remove all other wotos that match user id
  const archiveExistingDiscussions = async () => {
    const discussions = await API.getWotoData(course._id);
    discussions.forEach(async (discussion) => {
      // check if matches the current user
      if (!discussion.archived && discussion.owner._id === state.user._id) {
        const res = await API.editDiscussion(discussion._id, {
          archived: true,
        });
        console.log("Archiving Discussion", res);
      }
    });
  };

  // Post a new discussion
  const postDiscussion = async (values) => {
    try {
      const response = await API.askWotoQuestion(course._id, {
        description: { ...description, ...values },
      });
      setDiscussion(response);
      console.log("Posting discussion", response);
    } catch (error) {
      console.error(error);
    }
  };

  // Post a new discussion
  const archiveDiscussion = async () => {
    try {
      const response = await API.editDiscussion(discussion._id, {
        archived: true,
      });
      setDiscussion(response);
      console.log("Archiving discussion", response);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Join a Woto and leave your previous one
   * @param {value} id of woto to join
   */
  const joinDiscussion = async (value) => {
    seDiscussionParticipant(value);
    try {
      await Promise.all([
        API.joinDiscussion(value.id),
        archiveExistingDiscussions(),
      ]);
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  const pageProps = {
    course,
    session,
    description,
    setDescription,
    discussion,
    setDiscussion,
    discussionParticipant,
    seDiscussionParticipant,
    question,
    postDiscussion,
    archiveDiscussion,
    joinDiscussion,
    joinQueue,
    submitQuestion,
  };

  var page = null;
  if (question) {
    page = (
      <SubmitQuestion
        editQuestion={editQuestion}
        leaveTAQueue={leaveTAQueue}
        {...pageProps}
      />
    );
  } else if (discussion || !course.activeSession) {
    page = <WotoRoom {...pageProps} />;
  } else {
    page = (
      <JoinQueue
        joinWoto={() => setDiscussion({ archived: true })}
        {...pageProps}
      />
    );
  }

  return <div className="HelpWrapper">{page}</div>;
};

export default Help;
