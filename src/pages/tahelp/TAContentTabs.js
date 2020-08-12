import React from "react";
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

/**
 * Content on TA help for helping students, viewing collab table, and changing session
 * @param {props} setHelpingStudent
 * @param {props} editSession
 * @param {props} course
 * @param {props} session
 */
const TAContentTabs = (props) => {
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
            <HelpStudents course={props.course} />
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
          <CollabTable taPage session={props.session} course={props.course} />
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
          <h2>
            Edit This Session
            <p
              style={{
                color: "grey",
                paddingTop: "5px",
                paddingBottom: "10px",
              }}
            >
              Configure session settings here, including time, location, and
              personal conference link
            </p>
          </h2>
          <OpenSessionForm
            onSubmit={props.handleEdit}
            maxWidth={450}
            CTA="Edit Session"
            session={props.session}
            course={props.course}
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
          <h2>
            Edit the Question Form
            <p style={{ color: "grey", paddingTop: "5px" }}>
              Edit the select options available to students for any relevant
              form fields
            </p>
          </h2>

          <EditQuestionOptions
            questionTemplate={props.course?.sessionAttributes.questionTemplate}
            course_id={props.course._id}
          />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default TAContentTabs;
