import React, { useState, useEffect } from "react";
import API from "../../api/API";
import OpenSession from "./opensession-ta/OpenSession";
import ActiveTASession from "./ActiveTASession";

const TAHelp = ({ course }) => {
  const [stage, setStage] = useState();
  const [session, setSession] = useState();

  useEffect(() => {
    async function fetchSession() {
      const response = await API.getSession(course._id);
      response.forEach((session) => {
        if (session.active) {
          setSession(session);
        }
      });
    }
    if (course.activeSession) {
      fetchSession();
    }
  }, [course._id, course.activeSession]);

  const openSession = async (values) => {
    console.log("OPENING A SESSION:", values);
    try {
      const response = await API.openSession(course._id, values);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setStage("TAHELP");
  };

  const handleClose = async () => {
    console.log("CLOSING A SESSION");

    try {
      const response = await API.closeSession(course._id);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const joinSession = async (values) => {
    console.log("JOINING A SESSION");
    try {
      const response = await API.joinSessionAsStaffer(course._id);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setStage("TAHELP");
  };

  var page = null;
  switch (stage) {
    case "TAHELP":
      page = (
        <ActiveTASession
          handleClose={handleClose}
          course={course}
          session={session}
        />
      );
      break;
    default:
      page = (
        <OpenSession
          openSession={openSession}
          joinSession={joinSession}
          session={session}
          course={course}
        />
      );
      break;
  }

  return <div>{page}</div>;
};
export default TAHelp;
