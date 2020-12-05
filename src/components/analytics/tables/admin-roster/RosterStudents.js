import React from "react";
import { Card, Row, Col, Table, Space, Button } from "antd";
import ExportCSVButton from "../../../modals/buttons/ExportCSV";
import AddStudentsButton from "../../../modals/buttons/AddStudentsButton";
import { createRosterColumns } from "./createRosterColumns";
import API from "../../../../api/API";
import EmptyState from "./emptyState";
import LeftRightRow from "../../../leftrightrow/LeftRightRow";
//Set up card with header, table, and export csv file

class RosterStudents extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
        this.setState({ selectedRowsState: selectedRows });
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === "Disabled User",
        // Column configuration not to be checked
        name: record.name,
      }),
    };

    this.state = {
      dataSource: this.props.tableData,
      rowSelection: undefined,
      buttonClick: true,
      selectedRowsState: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.tableData !== state.dataSource) {
      return {
        dataSource: props.tableData,
      };
    }
    return null;
  }
  /*
  handleRowSelectionChange = (enable) => {
    console.log(enable);
    //  console.log(enable.currentTarget.value);
    console.log(this.state.rowSelection);
    this.setState({ rowSelection: enable ? {} : undefined });

    // this.setState({ rowSelection: enable.currentTarget.value ? {} : undefined });
  };
  */
  captureRowSelection = async () => {
    console.log(this.state.selectedRowsState);
    const newStaffers = this.state.selectedRowsState?.map((row) => row._id);
    try {
      for (const staffer of newStaffers) {
        console.log(staffer);
        const res = await API.promoteAssistant(this.props.course._id, staffer);
        console.log(res);
      }
      this.props.loadData();
    } catch (error) {
      console.error(error);
    }
    console.log(newStaffers);
  };

  handleRowSelectionButton = (enable) => {
    console.log(enable.currentTarget.value);
    console.log(this.state.rowSelection);
    if (this.state.buttonClick) {
      this.setState({ rowSelection: this.rowSelection });
      this.setState({ buttonClick: false });
    } else {
      this.setState({ rowSelection: undefined });
      this.setState({ buttonClick: true });
    }
    //this.setState({ rowSelection: enable.currentTarget.value ? {} : undefined })
  };

  renderExtra() {
    if (this.state.buttonClick === false) {
      return (
        <Button type="primary" onClick={this.captureRowSelection}>
          Promote Selected TA's
        </Button>
      );
    }
  }
  renderContent() {
    const { dataSource } = this.state;
    const buttonText = { true: "Promote to TAs", false: "Cancel" };

    //const {tableData, columns} = this.props;s
    return (
      <Col span={24}>
        <Card
          title={
            <LeftRightRow
              left={<h2>Students</h2>}
              right={
                <Space>
                  <AddStudentsButton course_id={this.props.course._id} />
                  {dataSource.length > 0 && (
                    <>
                      <Button
                        value={this.state.buttonClick}
                        onClick={this.handleRowSelectionButton}
                      >
                        {buttonText[this.state.buttonClick]}
                      </Button>
                      {this.renderExtra()}
                      <ExportCSVButton
                        title="Export to CSV"
                        data={this.props.tableData}
                      />
                    </>
                  )}
                </Space>
              }
            />
          }
        >
          <Row>
            <Col span={24}>
              {dataSource.length > 0 || this.props.loading ? (
                <Table
                  {...this.state}
                  loading={this.props.loading}
                  style={{ height: "300px" }}
                  columns={createRosterColumns(this.props.handleDelete)}
                  dataSource={dataSource}
                  pagination={{ pageSize: 10 }}
                  scroll={{ x: 650 }}
                />
              ) : (
                <EmptyState type="student" />
              )}
            </Col>
          </Row>
        </Card>
      </Col>
    );
  }
  render() {
    return <div className="table component">{this.renderContent()}</div>;
  }
}

export default RosterStudents;
