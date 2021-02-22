import React from "react";

import { Card, Col, Table } from "antd";
import LeftRightRow from "../../../util-components/leftrightrow/LeftRightRow";
import ExportCSVButton from "../../../modals/buttons/ExportCSV";

export default React.forwardRef(function PastQuestionsTable(props, ref) {
  var data = [
    {
      studentName: "Matthew Sclar",
      utaName: "Jay Don",
      waitTime: "20:54",
      timeToJoin: "0:02",
      interactionLength: "10:00",
    },
  ];
  var columns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      sorter: true,
    },
    {
      title: "UTA Name",
      dataIndex: "utaName",
      sorter: true,
    },
    {
      title: "Wait Time",
      dataIndex: "waitTime",
      sorter: true,
    },
    {
      title: "Time to Join",
      dataIndex: "timeToJoin",
      align: "center",
      sorter: true,
    },
    {
      title: "Interaction Length",
      dataIndex: "interactionLength",
      align: "center",
      sorter: true,
    },
  ];
  return (
    <div ref={ref}>
      <Col span={24}>
        <Card
          title={
            <LeftRightRow
              left={<h2>Past Questions</h2>}
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
    </div>
  );
});
