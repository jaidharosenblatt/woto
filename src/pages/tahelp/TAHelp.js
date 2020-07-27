import React, { useState, useEffect, useContext } from "react";
import API from "../../api/API";
import OpenSession from "./opensession-ta/OpenSession";
import ActiveTASession from "./ActiveTASession";
import { AuthContext } from "../../contexts/AuthContext";

const TAHelp = ({ course }) => {
  const [stage, setStage] = useState();
  const [session, setSession] = useState();
  const { state } = useContext(AuthContext);

  // Waiting on staffers update
  function checkIdInStaffers(staffers, id) {
    staffers.forEach((item) => {
      if (item._id === id) {
        return true;
      }
    });
    return false;
  }

  useEffect(() => {
    async function fetchSession() {
      const response = await API.getSession(course._id);
      response.forEach((session) => {
        // set state to session if active
        if (session.active) {
          setSession(session);
          // Check if current user is already a staffer and zoom room submitted
          if (
            checkIdInStaffers(session.staffers, state.user._id) &&
            state.user.meetingUrl
          ) {
            setStage("TAHELP");
          }
        }
      });
    }
    if (course.activeSession) {
      fetchSession();
    }
  }, [course._id, state.user._id, course.activeSession, state.user.meetingUrl]);

  const openSession = async (values) => {
    try {
      const response = await API.openSession(course._id, values);
      setSession(response);
      setStage("TAHELP");
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

  const joinSession = async (values) => {
    try {
      const response = await API.joinSessionAsStaffer(course._id);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setStage("TAHELP");
  };

  return (
    <>
      {stage === "TAHELP" ? (
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
