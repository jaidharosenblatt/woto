import React from "react";
import Popup from "../components/modals/tools/Popup";
import TurnHelpModal from "../components/modals/TurnHelpModal";
import EndEncounterModal from "../components/modals/EndEncounterModal";
import CancelQuestionModal from "../components/modals/CancelQuestionModal";
import VirtualRoomModal from "../components/modals/VirtualRoomModal";
import { DefaultProfile } from "../static/Images";
import DataPieChart from "../components/stat/DataPieChart";
import { Card } from "antd";
import TeachingStaffInstructorCard from "../components/teachingStaff/TeachingStaffInstructorCard";
import CourseSettings from "../components/form/CourseSettings";

const user = {
  name: "Jaidha Rosenblatt",
  userType: "Graduate Teaching Assistant",
  avatar: DefaultProfile,
};

const data = [
  { name: "Linked List", value: 400 },
  { name: "Array", value: 300 },
  { name: "Queue", value: 300 },
  { name: "Stack", value: 200 },
];

const Playground = () => {
  return (
    <div className="offset">
      <Card>
        <DataPieChart data={data} />
      </Card>
      <TeachingStaffInstructorCard  />
      <CourseSettings />
      <Popup buttonText="Turn Help Modal" content={TurnHelpModal} user={user} />

      <Popup
        buttonText="End Encounter Modal"
        content={EndEncounterModal}
        user={user}
      />

      <Popup
        buttonText="Cancel Question Modal"
        content={CancelQuestionModal}
        user={user}
      />

      <Popup
        buttonText="Virtual Room TA Modal"
        content={VirtualRoomModal}
        user={user}
      />
    </div>
  );
};

export default Playground;
