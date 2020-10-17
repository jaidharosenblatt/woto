import React, { useEffect, useContext, useReducer } from "react";

import { AuthContext } from "../../contexts/AuthContext";
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

  useEffect(() => {
    functions.setupSession(state, dispatch, authContext, course);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course, authContext]);

  return (
    <TAHelpContext.Provider value={{ state, dispatch }}>
      <LoadingScreenNavBar loading={state.loading}>
        {state.joined ? (
          <ActiveTASession />
        ) : (
          <NavBarCentered>
            <div className="ta-session-content">
              {state.session ? <JoinSession /> : <OpenSession />}
            </div>
          </NavBarCentered>
        )}
      </LoadingScreenNavBar>
    </TAHelpContext.Provider>
  );
};
export default TAHelp;
