import React from "react";
import { Card, Space, Tabs } from "antd";
import TaTable from "../../components/Tables/tahelp/TaTable";

import {
  TeamOutlined,
  SolutionOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import CollabTable from "../../components/Tables/collabtable/CollabTable";
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
            <h2>Help Students</h2>
            <TaTable status={props.helpingStudent} />
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
          <Space direction="vertical" style={{ width: "100%" }}>
            <h2>Edit This Session</h2>
            <OpenSessionForm
              onSubmit={props.handleEdit}
              maxWidth={450}
              CTA="Edit Session"
              session={props.session}
              course={props.course}
            />
          </Space>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default TAContentTabs;
