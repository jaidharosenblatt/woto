import React, { useEffect, useReducer, useState, useContext } from "react";
import JoinQueue from "./JoinQueue";

import { reducer } from "./util/reducer";
import { HelpContext } from "./util/HelpContext";
import { AuthContext } from "../../contexts/AuthContext";
import ActiveSession from "./ActiveSession";
import WotoRoom from "./wotos/WotoRoom";
import LoadingScreenNavBar from "../../components/spinner/LoadingScreenNavBar";
import functions from "./util/functions";
import { CourseContext } from "./util/CourseContext";

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
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const initialState = {
    course,
    discussions: [],
    questions: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function getSession() {
      setLoading(true);
      await functions.setupSession(state, dispatch, authContext.state);
      setLoading(false);
    }

    if (course.activeSession) {
      getSession();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);

  var page = null;
  if (state.question && state.question.active) {
    page = <ActiveSession />;
  } else if (state.discussion || !course.activeSession) {
    page = <WotoRoom />;
  } else {
    page = <JoinQueue />;
  }

  return (
    <CourseContext.Provider value={course._id}>
      <HelpContext.Provider value={{ state, dispatch }}>
        <LoadingScreenNavBar centered loading={loading}>
          <div className="HelpWrapper">{page}</div>
        </LoadingScreenNavBar>
      </HelpContext.Provider>
    </CourseContext.Provider>
  );
};

export default Help;
