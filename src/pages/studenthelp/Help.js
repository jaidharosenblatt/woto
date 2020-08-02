import React, { useState, useEffect } from "react";

import API from "../../api/API";
import JoinQueue from "./JoinQueue";
import WotoRoom from "./WotoRoom";
import SubmitQuestion from "./ActiveSession";
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
  const [description, setDescription] = useState(); // the fields related to the question
  const [question, setQuestion] = useState(); // the question for TA queue
  const [discussion, setDiscussion] = useState(); // the submission for Woto Room

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

  const joinQueue = async () => {
    try {
      const response = await API.postQuestion(course._id);
      setDescription(response.description);
      setQuestion(response);
    } catch (error) {
      console.log(error);
    }
  };

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

  const submitQuestion = async (values) => {
    setDescription(values);
    try {
      if (values.meetingURL) {
        await Promise.all([
          postDiscussion(values),
          patchMeetingURL(values.meetingURL),
        ]);
      }
      const response = await API.patchQuestion(question._id, {
        description: values,
      });
      setQuestion(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const editTAQuestion = async (values) => {
    setDescription(values);
    try {
      if (values.meetingURL) {
        await patchMeetingURL(values.meetingURL);
      }
      const response = await API.patchQuestion(question._id, {
        description: values,
      });
      setQuestion(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const leaveTAQueue = async () => {
    try {
      const response = await API.patchQuestion(question._id, { active: false });
      console.log(response);
      // reset discussion and question
      setQuestion(undefined);
      setDiscussion(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  const postDiscussion = async (values) => {
    try {
      const response = await API.askWotoQuestion(course._id, {
        description: values,
      });
      setDiscussion(values);
      setDescription(description);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const pageProps = {
    course,
    session,
    description,
    setDescription,
    discussion,
    question,
    postDiscussion,
    joinQueue,
    submitQuestion,
  };

  var page = null;
  if (question) {
    page = (
      <SubmitQuestion
        editTAQuestion={editTAQuestion}
        leaveTAQueue={leaveTAQueue}
        {...pageProps}
      />
    );
  } else if (discussion) {
    page = <WotoRoom {...pageProps} />;
  } else {
    page = <JoinQueue joinWoto={() => setDiscussion({})} {...pageProps} />;
  }

  return <div className="HelpWrapper">{page}</div>;
};

export default Help;
