import React, { useState, useEffect, useContext, useReducer } from "react";

import API from "../../api/API";
import JoinQueue from "./JoinQueue";
import WotoRoom from "./wotos/WotoRoom";
import SubmitQuestion from "./ActiveSession";
import { AuthContext } from "../../contexts/AuthContext";
import { reducer } from "./util/reducer";
import { HelpContext } from "./util/HelpContext";
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
  const temp = {
    assignment: ["test"],
    stage: "Just started the problem",
    concepts: ["Linked List"],
    details: "hi there",
  };
  const initialState = {
    description: temp,
    question: { description: temp, createdAt: new Date() },
  };
  const [session, setSession] = useState([]);
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    course,
    session,
  });

  useEffect(() => {
    async function getSession() {
      const res = await API.getSession(course._id);
      setSession(res[0]);
    }

    if (course.activeSession) {
      getSession();
    }
  }, [course]);

  // var page = null;
  // if (question && !question.archived) {
  //   page = <SubmitQuestion />;
  // } else if (discussion || !course.activeSession) {
  //   page = <WotoRoom />;
  // } else {
  //   page = <JoinQueue />;
  // }

  return (
    <HelpContext.Provider value={{ state, dispatch }}>
      <div className="HelpWrapper">
        <JoinQueue />
      </div>
    </HelpContext.Provider>
  );
};

export default Help;
