import React from "react";
import { Table, Space } from "antd";
import { createRosterColumns } from "../../analytics/tables/admin-roster/createRosterColumns";
import LeftRightRow from "../../util-components/leftrightrow/LeftRightRow";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
import DukeStudentInput from "../../user/addcourse/Form/DukeStudentInput";
import CSVDownloadButton from "./CSVDownloadButton";
import CSVUploadButton from "./CSVUploadButton";
import CSVUploadDrop from "./CSVUploadDrop";
import CSVRosterStatus from "./CSVRosterStatus";

/**
 *
 * @param {Boolean} loading from redux
 * @param {String} title for header
 * @param {Boolean} isStudent whether or not it is being used for students
 */
const StudentTARoster = (props) => {
  const tableData = props.isStudent ? props.studentRoster : props.taRoster;
  const empty = !tableData || tableData?.length === 0 || props.loading;

  const pluralUsers = props.isStudent ? "students" : "teaching assistants";
  // Since Ant form adds a bottom margin for displaying errors
  // we manually add margin to center text
  const titleStyle = empty ? {} : { marginBottom: 24 };
  return (
    <div>
      <LeftRightRow
        left={<h2 style={titleStyle}>{props.title}</h2>}
        right={
          <Space align="top">
            {!empty && (
              <>
                <DukeStudentInput isStudent={props.isStudent} />
                <CSVUploadButton />
                <CSVDownloadButton data={tableData} />
              </>
            )}
          </Space>
        }
      />
      <CSVRosterStatus />

      {empty ? (
        <Space direction="vertical" style={{ width: "100%" }}>
          <p>
            No {pluralUsers} yet. Upload a .csv file that includes the NetId and
            name of the {pluralUsers} you want to enroll. Click here for an
            example roster .csv file
          </p>
          <CSVUploadDrop />
          <p>You can also add {pluralUsers} one at a time below</p>
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
