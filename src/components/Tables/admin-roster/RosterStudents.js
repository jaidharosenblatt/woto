import React from "react";
import { Card, Row, Col, Table, Space, Button } from "antd";
import ExportCSVButton from "../../buttons/ExportCSV";
import AddStudentsButton from "../../buttons/AddStudentsButton";
import { createRosterColumns } from "./createRosterColumns";
import API from "../../../api/API";
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
    const newStaffers = this.state.selectedRowsState.map((row) => row._id);
    try {
      const res = await API.promoteAssistant(this.props.course._id);
      console.log(res);
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

    const styles = {
      card: {
        backgroundColor: "white",
        height: "100%",
        lineHeight: 1.25,
        margin: "0px",
      },
    };

    //const {tableData, columns} = this.props;s
    return (
      <Col span={24}>
        <br />
        <Card style={styles.card}>
          <Row justify="center" align="top" gutter={[16, 20]}>
            <Col xs={24} sm={2} align="left">
              <h2>Students</h2>
            </Col>
            <Col xs={24} sm={22} align="right">
              <Space direction="horizontal">
                {this.renderExtra()}
                <Button
                  value={this.state.buttonClick}
                  onClick={this.handleRowSelectionButton}
                >
                  {buttonText[this.state.buttonClick]}
                </Button>

                <AddStudentsButton course_id={this.props.course._id} />
                <ExportCSVButton
                  title="Export to CSV"
                  data={this.props.tableData}
                />
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                {...this.state}
                loading={this.props.loading}
                style={{ height: "300px" }}
                pagination={{ pageSize: 50 }}
                columns={createRosterColumns()}
                dataSource={dataSource}
                scroll={{ y: 240, x: 650 }}

                // rowSelection = {rowSelection}
              />
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
