import React from "react";
import { Card, Row, Col, Table, Space } from "antd";
import ExportCSVButton from "../../../modals/buttons/ExportCSV";
import { createRosterColumns } from "./createRosterColumns";
import LeftRightRow from "../../../util-components/leftrightrow/LeftRightRow";
import EmptyState from "./emptyState";
import { connect } from "react-redux";
import selectors from "../../../../redux/selectors";
import DukeStudentInput from "../../../user/addcourse/Form/DukeStudentInput";

/**
 *
 * @param {Boolean} loading from redux
 * @param {String} title for header
 * @param {Boolean} isStudent whether or not it is being used for students
 * @param {Array} tableData
 */
const StudentTARoster = (props) => {
  return (
    <div>
      <LeftRightRow
        left={<h2>{props.title}</h2>}
        right={
          <Space>
            <DukeStudentInput isStudent={props.isStudent} />
            {props.tableData.length > 0 && (
              <ExportCSVButton title="Export to CSV" data={props.tableData} />
            )}
          </Space>
        }
      />

      {props.tableData.length > 0 || props.loading ? (
        <Table
          loading={props.loading}
          columns={createRosterColumns(props.handleDelete)}
          dataSource={props.tableData}
          pagination={{ pageSize: 10 }}
        />
      ) : (
        <EmptyState type={props.isStudent ? "student" : "ta"} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: selectors.getLoading(state),
});

export default connect(mapStateToProps)(StudentTARoster);
