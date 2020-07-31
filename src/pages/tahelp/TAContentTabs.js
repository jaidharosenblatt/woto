import React from "react";
import { Card, Tabs } from "antd";

import TaTable from "../../components/Tables/tahelp/TaTable";

import {
  TeamOutlined,
  SolutionOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import CollabTable from "../../components/Tables/collabtable/CollabTable";

const TAContentTabs = (props) => {
  return (
    <Card onClick={() => props.setHelpingStudent(true)}>
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
          <TaTable status={props.helpingStudent} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <>
              <TeamOutlined />
              Woto Room
            </>
          }
          key="woto"
        >
          <CollabTable session={props.session} course={props.course} />
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
          Content of card tab 3
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default TAContentTabs;
