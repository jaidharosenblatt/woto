import React, { useContext } from "react";
import { Card, Space, Tabs } from "antd";
import HelpStudents from "./HelpStudents";

import EditQuestionOptions from "./EditQuestionOptions";
import {
  TeamOutlined,
  SolutionOutlined,
  SettingOutlined,
  FormOutlined,
} from "@ant-design/icons";
import CollabTable from "./WotoRoomsTA";
import OpenSessionForm from "./openjoin/OpenSessionForm";
import { CourseContext } from "./util/CourseContext";
import { connect } from "react-redux";
import redux from "../../redux/courses";

/**
 * Content on TA help for helping students, viewing collab table, and changing session
 */
const TAContentTabs = ({ successMessage, courses }) => {
  const courseID = useContext(CourseContext);
  const state = redux.select(courses, courseID);

  return (
    <Card>
      <Tabs defaultActiveKey="queue" type="card">
        <Tabs.TabPane
          tab={
            <>
              <SolutionOutlined />
              Student Queue
            </>
          }
          key="queue"
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <HelpStudents />
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
            maxWidth={450}
            CTA="Edit Session"
            session={state.session}
            course={state.course}
            successMessage={successMessage}
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

export default connect(redux.mapStateToProps)(TAContentTabs);
