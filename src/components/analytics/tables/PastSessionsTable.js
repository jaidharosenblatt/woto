import React from "react";
import { Card, Button, Col, Table } from "antd";
import ExportCSVButton from "../../modals/buttons/ExportCSV";
import util from "../../../util";
import LeftRightRow from "../../util-components/leftrightrow/LeftRightRow";
/*
 *
 */

const PastSessionsTable = ({ sessions = [] }) => {
  function parseData(sessionData) {
    var data = [];
    sessionData.forEach((session, i) => {
      var date = util.convertDateString(session.startTime);
      var startTime = util.convertTimeString(session.startTime);
      var endTime = util.convertTimeString(session.endTime);
      var staffers = session.staffers.length;

      data.push({
        key: i,
        date: date,
        startTime: startTime,
        endTime: endTime,
        studentsHelped: session.num_questions,
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
      dataIndex: "date",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
    },
    {
      title: "Students Helped",
      dataIndex: "studentsHelped",
      align: "center",
    },
    {
      title: "Staffers",
      dataIndex: "staffers",
      align: "center",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      dataIndex: "specificSession",
      key: "specificSession",
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
