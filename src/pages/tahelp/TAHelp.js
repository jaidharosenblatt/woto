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
  const [session, setSession] = useState();
  // if user is already a staffer in the active session
  const [inStaffers, setInStaffers] = useState(false);

  //Get the current session
  const getSession = useCallback(async () => {
    const response = await API.getSession(course._id);
    response.forEach((session) => {
      // set state to session if active
      if (session.active) {
        setSession(session);

        // Check if current user is already a staffer
        const included =
          session.staffers.filter((item) => item._id === state.user._id)
            .length > 0;
        setInStaffers(included);

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
      } catch (error) {
        console.error(error);
      }
    }
  };
  // Open a new session
  const openSession = async (values) => {
    setInStaffers(true);
    API.openSession(course._id, values)
      .then((session) => setSession(session))
      .then(() => {
        patchMeetingUrl(values.meetingURL);
      })
      .then(setJoinedSession(true))
      .catch((error) => console.error(error));
  };

  // Close a session
  const handleClose = async () => {
    try {
      await API.closeSession(course._id);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // Join an existing session
  const joinSession = (values) => {
    patchMeetingUrl(values.meetingURL)
      .then(() => {
        // join session if not already a staffer
        if (!inStaffers) {
          API.joinSessionAsStaffer(course._id);
          setInStaffers(true);
        }
      })
      .then(getSession())
      .then(setJoinedSession(true))
      .catch((error) => console.error(error));
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
