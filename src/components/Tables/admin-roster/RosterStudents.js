import React from "react";
import { Card, Row, Col, Table, Popconfirm, Space, Button } from "antd";
import ExportCSVButton from "../../buttons/ExportCSV";
import ImportCSVButton from "../../buttons/ImportCSV";
import AddStudentsButton from "../../buttons/AddStudentsButton";
import { CloseCircleOutlined } from "@ant-design/icons";
//import { CloseCircle } from "../../../static/Images";

//Set up card with header, table, and export csv file

class RosterStudents extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.columns = [
      {
        title: "Name",
        key: "fullName",
        render: (text, record) => (
          <h4>{`${record.firstname} ${record.lastname}`}</h4>
        ),
        fixed: "left",
        width: 100,
      },
      {
        title: "Year",
        dataIndex: "year",
        key: "year",
        align: "center",
      },
      {
        title: "Sessions Attended",
        dataIndex: "sessionsAttended",
        key: "sessionsAttended",
        align: "center",
      },
      {
        title: "Questions Asked",
        dataIndex: "questionsAsked",
        key: "questionsAsked",
        align: "center",
      },
      {
        title: "Time Waited (minutes)",
        dataIndex: "timeWaited",
        key: "timeWaited",
        align: "center",
      },
      {
        title: "Interaction Length (avg)",
        dataIndex: "interactionLength",
        key: "interactionLength",
        align: "center",
      },

      {
        title: "TA Satisfaction",
        dataIndex: "satisfaction",
        align: "center",
        key: "satisfaction",
        render: (text, record) => <h4>{`${record.satisfaction * 100}%`}</h4>,
      },
      {
        //title: "Rating",
        title: "",
        align: "center",
        render: (text, record) => (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => this.props.removeUser(record.key)}
          >
            <CloseCircleOutlined />
          </Popconfirm>
        ),
      },
    ];

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
  captureRowSelection = () => {
    console.log(this.state.selectedRowsState);
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
    const buttonText = { true: "Promote to TA", false: "Cancel" };

    const styles = {
      card: {
        //  lineHeight: 1.25,
        backgroundColor: "#ffffff",
        //padding: "16px",
        //border: "1px solid #91D5FF",
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
                  type="primary"
                  value={this.state.buttonClick}
                  onClick={this.handleRowSelectionButton}
                >
                  {buttonText[this.state.buttonClick]}
                </Button>

                <ImportCSVButton title="Import to CSV" />
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
                style={{ height: "300px" }}
                pagination={{ pageSize: 50 }}
                columns={this.columns}
                dataSource={dataSource}
                scroll={{ y: 240, x: 650 }}

                // rowSelection = {rowSelection}
              />
            </Col>
          </Row>
          <Row align="top">
            <Col align="center" span={24}>
              <AddStudentsButton course_id={this.props.course._id} />
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
/*
 <Button  icon={<CloseCircleOutlined />} onClick={this.props.removeUser} />
*/
/*<Form.Item justify='center' label="Checkbox">
                 <Switch
                    checked={!!this.state.rowSelection}
                    onChange={this.handleRowSelectionChange}
                  /> 
                </Form.Item>
                  
                  */
