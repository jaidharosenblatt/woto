import React from "react";
import { Card, Button, Row, Col, Table } from "antd";
import ExportCSVButton from "../../modals/buttons/ExportCSV";
import SpecificSession from "../../instructor/adminSpecificSession/SpecificSession";
import util from "../../../util";
import TitleStat from "../sessions/TitleStat";
import { FieldTimeOutlined } from "@ant-design/icons";
import LeftRightRow from "../../util-components/leftrightrow/LeftRightRow";
/*
 *
 */

const PastSessionsTable = () => {
  const sessions = [
    {
      startTime: "Sun Jan 31 2021 23:00:00 GMT-0500 (Eastern Standard Time)",
      endTime: "Sun Jan 31 2021 23:00:00 GMT-0500 (Eastern Standard Time)",
      staffers: ["geen", "gaan", "goon"],
      location: "Virtual",
    },
  ];

  function parseData(sessionData) {
    var data = [];
    sessionData.forEach((session) => {
      var date = util.convertDateString(session.startTime);
      var startTime = util.convertTimeString(session.startTime);
      var endTime = util.convertTimeString(session.endTime);
      var studentsHelped = 3; //CALCULATE STUDENTS HELPED
      var staffers = session.staffers.length;

      data.push({
        date: date,
        startTime: startTime,
        endTime: endTime,
        studentsHelped: studentsHelped,
        staffers: staffers,
        location: session.location,
        specificSession: null,
      });
    });

    return data;
  }
  var data = parseData(sessions);
  var columns = [
    {
      title: "Date",
      //key: date,
      dataIndex: "date",
    },
    {
      title: "Start Time",
      //key: startTime,
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      //key: endTime,
      dataIndex: "endTime",
    },
    {
      title: "Students Helped",
      //key: studentsHelped,
      dataIndex: "studentsHelped",
      align: "center",
    },
    {
      title: "Staffers",
      //key: staffers,
      dataIndex: "staffers",
      align: "center",
    },
    {
      title: "Location",
      // key: location,
      dataIndex: "location",
    },
    {
      dataIndex: "specificSession",
      //key: specificSession,
      width: 120,
      render: () => (
        <Button
          block
          type="primary"
          onClick={() => console.log("Go to specific session")}
          target="_blank"
        >
          View Sessions Stats
        </Button>
      ),
    },
  ];
  return (
    <Col span={24}>
      <Card
        title={
          <LeftRightRow
            left={<h2>Past Sessions</h2>}
            right={
              <ExportCSVButton
                title="Export to CSV"
                data={data}
                filename="sessions"
              />
            }
          />
        }
      >
        <Table columns={columns} dataSource={data} scroll={{ x: 400 }} />
      </Card>
    </Col>
  );
};

export default PastSessionsTable;
