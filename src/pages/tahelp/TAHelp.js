import React, { useState, useEffect, useContext, useCallback } from "react";
import API from "../../api/API";

import { AuthContext, actions } from "../../contexts/AuthContext";
import ActiveTASession from "./ActiveTASession";
import LoadingScreenNavBar from "../../components/spinner/LoadingScreenNavBar";
import JoinSession from "./openjoin/JoinSession";
import OpenSession from "./openjoin/OpenSession";
import NavBarCentered from "../../components/centeredpage/NavBarCentered";

/**
 * Controller component for storing state of a course's office hour sessions
 * @param course course for this session
 */
const TAHelp = ({ course }) => {
  const { state, dispatch } = useContext(AuthContext);
  const [joinedSesssion, setJoinedSession] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [session, setSession] = useState();
  // if user is already a staffer in the active session

  //Get the current session
  const getSession = useCallback(async () => {
    const response = await API.getSession(course._id);
    // get active session
    const session = response[0];
    console.log(session);
    // set state to session if active
    if (session && session.active) {
      setSession(session);
      setError(null);
      // Check if current user is already a staffer
      const included =
        session.staffers.filter((item) => item.name === state.user.name)
          .length > 0;

      if (included) {
        setJoinedSession(true);
      }
    }

    setLoading(false);
  }, [course._id, state.user.name]);

  useEffect(() => {
    getSession();
    if (course.activeSession) {
      getSession();
    }
  }, [getSession, course.activeSession]);

  // Edit the meeting url of the user into db and context if meeting url is new
  const patchMeetingUrl = async (meetingURL) => {
    if (meetingURL !== state.user.meetingURL) {
      try {
        const response = await API.editProfile({ meetingURL: meetingURL });
        dispatch({
          type: actions.EDIT,
          payload: { user: { ...response } },
        });
        setError(null);
      } catch (error) {
        console.error(error.response.data.message);
        setError(error.response.data.message);
      }
    }
  };
  // Open a new session
  const openSession = async (values) => {
    try {
      const [session] = await Promise.all([
        API.openSession(course._id, values),
        patchMeetingUrl(values.meetingURL),
      ]);
      setSession(session);
      setJoinedSession(true);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  // Close a session
  const closeSession = async () => {
    try {
      await API.closeSession(course._id);
      setError(null);
      setJoinedSession(false);
      console.log(joinedSesssion);
    } catch (error) {
      console.error(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  // Join an existing session
  const joinSession = async (values) => {
    // Check if staffer in session already as inactive and set them as active
    const included =
      session.staffers.filter(
        (item) =>
          item.staffer.assistant === state.user._id && item.staffer.active
      ).length > 0;
    console.log(included);

    if (included) {
      // Sign in that active user
      await signInOff(true);
      setJoinedSession(true);
    } else {
      try {
        const [session] = await Promise.all([
          API.joinSessionAsStaffer(course._id),
          patchMeetingUrl(values.meetingURL),
        ]);
        if (session) {
          setSession(session);
          setJoinedSession(true);
        } else {
          setError("Unable to join session. Please refresh the page");
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  };

  /**
   * Set the current user to inactive in the course array
   * @param {*} active active status to change to for current user
   */
  const signInOff = async (active) => {
    //only make first instance of user active
    let found = false;
    const staffers = session.staffers.map((item) => {
      if (item._id === state.user._id && !found) {
        found = true;
        return { staffer: { ...item.staffer, active: active }, _id: item._id };
      } else {
        return item;
      }
    });
    try {
      const res = await API.editSession(course._id, { staffers: staffers });
      setSession(res);
      setJoinedSession(active);
    } catch (error) {
      console.error(error);
    }
  };

  const editSession = async (values) => {
    const { meetingURL, ...changes } = values;

    try {
      if (meetingURL) {
        await patchMeetingUrl(meetingURL);
      }
      const res = await API.editSession(course._id, changes);
      setSession(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoadingScreenNavBar loading={loading}>
      {joinedSesssion ? (
        <ActiveTASession
          handleClose={closeSession}
          handleEdit={editSession}
          handleSignOff={() => signInOff(false)}
          course={course}
          session={session}
        />
      ) : (
        <NavBarCentered>
          <div className="ta-session-content">
            {joinedSesssion ? (
              <JoinSession
                session={session}
                onSubmit={joinSession}
                course={course}
                error={error}
              />
            ) : (
              <OpenSession
                onSubmit={openSession}
                course={course}
                error={error}
              />
            )}
          </div>
        </NavBarCentered>
      )}
    </LoadingScreenNavBar>
  );
};
export default TAHelp;
