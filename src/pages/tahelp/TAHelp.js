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

  const joinSession = (values) => {
    console.log("JOINING A SESSION");
    setSession(values);
    setStage("TAHELP");
  };

  var page = null;
  switch (stage) {
    case "TAHELP":
      page = <ActiveTASession course={course} session={session} />;
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
