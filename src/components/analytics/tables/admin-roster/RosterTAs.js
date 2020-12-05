import React from "react";
import { Card, Row, Col, Table } from "antd";
import ExportCSVButton from "../../../modals/buttons/ExportCSV";
import { createRosterColumns } from "./createRosterColumns";
import LeftRightRow from "../../../leftrightrow/LeftRightRow";
import EmptyState from "./emptyState";

//Set up card with header, table, and export csv file

const RosterTAs = (props) => {
  console.log(props.loading);
  return (
    <Col span={24}>
      <Card
        title={
          <LeftRightRow
            left={<h2>Teaching Assistants</h2>}
            right={
              props.tableData.length > 0 && (
                <ExportCSVButton title="Export to CSV" data={props.tableData} />
              )
            }
          />
        }
      >
        <Row>
          <Col span={24}>
            {props.tableData.length > 0 || props.loading ? (
              <Table
                loading={props.loading}
                style={{ height: "300px" }}
                columns={createRosterColumns(props.handleDelete)}
                dataSource={props.tableData}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 650 }}
              />
            ) : (
              <EmptyState />
            )}
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default RosterTAs;
