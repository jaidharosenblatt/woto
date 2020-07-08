import React from "react";
import { Card, Row, Col, Table, Tag } from "antd";
import ExportCSVButton from "../../buttons/ExportCSV";

//Set up card with header, table, and export csv file

class StudentsNotHelpedTable extends React.Component {
  
  
    renderContent() {
      
      //Create and assign color stage tag
      const createTag = (stage) => {
        if (stage === "Just Started") {
          return <Tag color="green" key={stage}>{`${stage}`}</Tag>;
        } else if (stage === "Debugging Solution") {
          return <Tag color="blue" key={stage}>{`${stage}`}</Tag>;
        } else {
          return <Tag color="volcano" key={stage}>{`${stage}`}</Tag>;
        }
      };
   
    const TA_COLUMNS = [
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
        title: "Time Waited (minutes)",
        dataIndex: "timeWaited",
        key: "timeWaited",
      },
      {
        title: "Entered Queue",
        dataIndex: "enteredQueue",
        key: "enteredQueue",
      },
      {
        title: "Left Queue",
        dataIndex: "leftQueue",
        key: "leftQueue",
      },
      {
        title: "Session Start",
        dataIndex: "sessionStart",
        key: "sessionStart",
      },
      {
        title: "Session End",
        dataIndex: "sessionEnd",
        key: "sessionEnd",
      },
      {
        title: "Assignment",
        dataIndex: "assignment",
        key: "assignment",
      },
      {
        title: "Stage",
        dataIndex: "stage",
        key: "stage",
        render: (stage) => <>{createTag(stage)}</>,
        width: 80,
      },
    ];

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
            <Col span = {24} align="right">
              <ExportCSVButton title="Export to CSV" data={this.props.tableData}/>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                style={{ height: "300px" }}
                pagination={{ pageSize: 5 }}
                columns={TA_COLUMNS}
                dataSource={this.props.tableData}
                scroll={{ x: 650 }}
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

export default StudentsNotHelpedTable;
