import React, { useState, useEffect, useContext, useCallback } from "react";
import API from "../../api/API";

import { AuthContext } from "../../contexts/AuthContext";
import OpenSession from "./opensession-ta/OpenSession";
import ActiveTASession from "./ActiveTASession";
import LoadingScreenNavBar from "../../components/spinner/LoadingScreenNavBar";

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
    response.forEach((session) => {
      // set state to session if active
      if (session.active) {
        setSession(session);
        setError(null);
        // Check if current user is already a staffer
        const included =
          session.staffers.filter((item) => item._id === state.user._id)
            .length > 0;

        if (included) {
          setJoinedSession(true);
        }
      }
    });
    setLoading(false);
  }, [course._id, state.user._id]);

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
          type: "EDIT",
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
  const handleClose = async () => {
    try {
      await API.closeSession(course._id);
      setError(null);
      window.location.reload();
    } catch (error) {
      console.error(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  // Join an existing session !TODO setSession to return session
  const joinSession = async (values) => {
    try {
      await Promise.all([
        API.joinSessionAsStaffer(course._id),
        patchMeetingUrl(values.meetingURL),
        getSession(),
      ]);
      if (session) {
        setJoinedSession(true);
      } else {
        setError("Unable to join session. Please refresh the page");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <LoadingScreenNavBar loading={loading}>
      {joinedSesssion ? (
        <ActiveTASession
          handleClose={handleClose}
          course={course}
          session={session}
        />
      ) : (
        <OpenSession
          error={error}
          openSession={openSession}
          joinSession={joinSession}
          session={session}
          course={course}
        />
      )}
    </LoadingScreenNavBar>
  );
};
export default TAHelp;
