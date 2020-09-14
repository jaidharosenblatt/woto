import React, { useEffect, useContext, useReducer } from "react";

import { AuthContext, actions } from "../../contexts/AuthContext";
import ActiveTASession from "./ActiveTASession";
import LoadingScreenNavBar from "../../components/spinner/LoadingScreenNavBar";
import JoinSession from "./openjoin/JoinSession";
import OpenSession from "./openjoin/OpenSession";
import NavBarCentered from "../../components/centeredpage/NavBarCentered";
import { reducer } from "./util/reducer";
import functions from "./util/functions";
import { TAHelpContext } from "./util/TAHelpContext";

/**
 * Controller component for storing state of a course's office hour sessions
 * @param course course for this session
 */
const TAHelp = ({ course }) => {
  const initialState = { course, loading: true };
  const [state, dispatch] = useReducer(reducer, initialState);
  const authContext = useContext(AuthContext);
  // if user is already a staffer in the active session
  const inSession =
    state.session?.staffers.filter(
      (item) => item.name === authContext.state.user.name
    ).length > 0;
  // whether or not the ta is a staffer in the active session

  useEffect(() => {
    functions.setupSession(state, dispatch, course);
  }, [course]);

  return (
    <TAHelpContext.Provider value={{ state, dispatch }}>
      <LoadingScreenNavBar loading={state.loading}>
        {inSession ? (
          <ActiveTASession course={course} session={state.session} />
        ) : (
          <NavBarCentered>
            <div className="ta-session-content">
              {state.session ? (
                <JoinSession
                  session={state.session}
                  course={course}
                  error={state.message?.error}
                />
              ) : (
                <OpenSession course={course} error={state.message?.error} />
              )}
            </div>
          </NavBarCentered>
        )}
      </LoadingScreenNavBar>
    </TAHelpContext.Provider>
  );
};
export default TAHelp;
