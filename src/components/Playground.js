import React from "react";
import Popup from "./modals/tools/Popup";
import TurnHelpModal from "./modals/TurnHelpModal";
import EndEncounterModal from "./modals/EndEncounterModal";
import CancelQuestionModal from "./modals/CancelQuestionModal";
import VirtualRoomModal from "./modals/VirtualRoomModal";
import { DefaultProfile } from "../static/Images";
import DataPieChart from "./analytics/sessions/DataPieChart";
import { Card } from "antd";

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
