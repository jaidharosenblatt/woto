import React, { useState } from "react";
import API from "../../api/API";
import OpenSession from "./opensession-ta/OpenSession";
import ActiveTASession from "./ActiveTASession";

const TAHelp = ({ course }) => {
  const [stage, setStage] = useState();
  const [session, setSession] = useState();

  const openSession = async (values) => {
    console.log("OPENING A SESSION:", values);
    try {
      const response = await API.openSession(course._id, values);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setSession(values);
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
    setSession(values);
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
          course={course}
        />
      );
      break;
  }

  return <div>{page}</div>;
};
export default TAHelp;
