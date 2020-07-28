import React, { useState, useEffect, useContext } from "react";
import API from "../../api/API";
import OpenSession from "./opensession-ta/OpenSession";
import ActiveTASession from "./ActiveTASession";
import { AuthContext } from "../../contexts/AuthContext";

const TAHelp = ({ course }) => {
  const [status, setStatus] = useState();
  const [session, setSession] = useState();
  const { state } = useContext(AuthContext);
  const [inStaffers, setInStaffers] = useState(false);

  useEffect(() => {
    async function fetchSession() {
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
    }
    if (course.activeSession) {
      fetchSession();
    }
  }, [course._id, state.user._id, course.activeSession]);

  const patchMeetingUrl = async (meetingURL) => {
    try {
      const response = await API.editProfile({ meetingURL: meetingURL });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const openSession = async (values) => {
    try {
      const response = await API.openSession(course._id, values);
      setSession(response);
      setStatus("JOINED");
    } catch (error) {
      console.error(error);
    }
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
