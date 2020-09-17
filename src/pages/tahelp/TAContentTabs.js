import React, { useContext } from "react";
import { Card, Space, Tabs } from "antd";
import HelpStudents from "../../components/Tables/collabtable/HelpStudents";

import EditQuestionOptions from "./EditQuestionOptions";
import {
  TeamOutlined,
  SolutionOutlined,
  SettingOutlined,
  FormOutlined,
} from "@ant-design/icons";
import CollabTable from "../../components/Tables/collabtable/WotoRoomsTA";
import OpenSessionForm from "./openjoin/OpenSessionForm";
import { TAHelpContext } from "./util/TAHelpContext";

/**
 * Content on TA help for helping students, viewing collab table, and changing session
 */
const TAContentTabs = (props) => {
  const { state } = useContext(TAHelpContext);
  return (
    <Card>
      <Tabs defaultActiveKey="queue" type="card">
        <Tabs.TabPane
          onClick={() => props.setHelpingStudent(true)}
          tab={
            <>
              <SolutionOutlined />
              Student Queue
            </>
          }
          key="queue"
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <HelpStudents session={state.session} course={state.course} />
          </Space>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <>
              <TeamOutlined />
              Woto Rooms
            </>
          }
          key="woto"
        >
          <CollabTable taPage session={state.session} course={state.course} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <>
              <SettingOutlined />
              Session Settings
            </>
          }
          key="settings"
        >
          <h2>Edit This Session</h2>
          <p>
            Configure session settings here, including time, location, and
            personal conference link
          </p>
          <OpenSessionForm
            onSubmit={props.handleEdit}
            maxWidth={450}
            CTA="Edit Session"
            session={props.session}
            course={props.course}
            successMessage={props.successMessage}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <>
              <FormOutlined />
              Question Form
            </>
          }
          key="questionform"
        >
          <h2>Edit the Question Form</h2>
          <p>
            Edit the select options available to students for any relevant form
            fields
          </p>

          <EditQuestionOptions />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default TAContentTabs;
