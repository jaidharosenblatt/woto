import React, { useState, useEffect, useContext, useCallback } from "react";
import API from "../../api/API";
import OpenSession from "./opensession-ta/OpenSession";
import ActiveTASession from "./ActiveTASession";
import { AuthContext } from "../../contexts/AuthContext";

const TAHelp = ({ course }) => {
  const { state } = useContext(AuthContext);
  const [status, setStatus] = useState();
  const [session, setSession] = useState();
  // if user is already a staffer in the active session
  const [inStaffers, setInStaffers] = useState(false);

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
          setStatus("JOINED");
        }
      }
    });
  }, [course._id, state.user._id]);

  useEffect(() => {
    getSession();
    if (course.activeSession) {
      getSession();
    }
  }, [getSession, course.activeSession]);

  const patchMeetingUrl = async (meetingURL) => {
    try {
      const response = await API.editProfile({ meetingURL: meetingURL });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const openSession = async (values) => {
    console.log(values);
    setInStaffers(true);
    API.openSession(course._id, values)
      .then((session) => setSession(session))
      .then(() => {
        patchMeetingUrl(values.meetingURL);
      })
      .then(setStatus("JOINED"))
      .catch((error) => console.error(error));
  };

  const handleClose = async () => {
    try {
      const response = await API.closeSession(course._id);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

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
      .then(setStatus("JOINED"))
      .catch((error) => console.error(error));
  };

  return (
    <>
      {status === "JOINED" ? (
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
    </>
  );
};
export default TAHelp;
