import React from "react";
import { Card, Row, Col, Table, Space, Upload, Button } from "antd";
import ExportCSVButton from "../../../modals/buttons/ExportCSV";
import { createRosterColumns } from "./createRosterColumns";
import LeftRightRow from "../../../util-components/leftrightrow/LeftRightRow";
import { connect } from "react-redux";
import selectors from "../../../../redux/selectors";
import DukeStudentInput from "../../../user/addcourse/Form/DukeStudentInput";
import CSVDownloadButton from "../../../instructor/adminRoster/CSVDownloadButton";
import CSVUploadButton from "../../../instructor/adminRoster/CSVUploadButton";

/**
 *
 * @param {Boolean} loading from redux
 * @param {String} title for header
 * @param {Boolean} isStudent whether or not it is being used for students
 */
const StudentTARoster = (props) => {
  const tableData = props.isStudent ? props.studentRoster : props.taRoster;
  const empty = !tableData || tableData?.length === 0 || props.loading;

  // Since Ant form adds a bottom margin for displaying errors
  // we manually add margin to center text
  const titleStyle = empty ? {} : { marginBottom: 24 };
  return (
    <div>
      <LeftRightRow
        left={<h2 style={titleStyle}>{props.title}</h2>}
        right={
          <Space align="top">
            {!empty && <DukeStudentInput isStudent={props.isStudent} />}
            {!empty && <CSVDownloadButton data={tableData} />}
            <CSVUploadButton />
          </Space>
        }
      />

      {empty ? (
        <Space direction="vertical">
          <p>
            No {props.isStudent ? "students" : "teaching assistants"} yet. Add
            your first {props.isStudent ? "student" : "teaching assistant"}{" "}
            below
          </p>
          <DukeStudentInput isStudent={props.isStudent} />
        </Space>
      ) : (
        <Table
          loading={props.loading}
          columns={createRosterColumns(props.handleDelete)}
          dataSource={tableData}
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: selectors.getLoading(state),
  taRoster: selectors.getTARoster(state),
  studentRoster: selectors.getStudentRoster(state),
});

export default connect(mapStateToProps)(StudentTARoster);
