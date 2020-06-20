import React from "react";
import Popup from "../components/modals/tools/Popup";
import TurnHelpModal from "../components/modals/TurnHelpModal";
import EndEncounterModal from "../components/modals/EndEncounterModal";
import CancelQuestionModal from "../components/modals/CancelQuestionModal";
import ClearQueueModal from "../components/modals/ClearQueueModal";
import VirtualRoomModal from "../components/modals/VirtualRoomModal";
import { DefaultProfile } from "../static/Images";

const user = {
  name: "Jaidha Rosenblatt",
  role: "Graduate Teaching Assistant",
  avatar: DefaultProfile,
};
const Playground = () => {
  return (
    <div className="offset">
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
        buttonText="Clear Queue TA Modal"
        content={ClearQueueModal}
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
