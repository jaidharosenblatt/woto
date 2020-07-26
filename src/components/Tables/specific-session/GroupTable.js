import React from "react";
import { Card, Row, Col, Table } from "antd";
import ExportCSVButton from "../../../components/buttons/ExportCSV";
//Overall: Set up card with header, table, and Switch. MainColabComp.js
/*
@Tommy Tilton
props input:
columns data: 'props.columns'
data input: 'props.data'
*/

class GroupTable extends React.Component {
  //Function to Determine expected wait time left.
  getTimeLeft() {
    return 12;
  }

  //Function to display student's to other students waiting in line
  displayQuestion(checked) {
    console.log(checked);
  }

  renderContent() {
    //const {tableData, columns} = this.props;s
    return (
      <Col span={24}>
        <Row justify="center" align="middle" gutter={[16, 10]}>
          <Col span={12} align="left">
            <h5>Groups</h5>
          </Col>
          <Col span={12} align="right">
            <ExportCSVButton title="Export to CSV" data={this.props.data} />
          </Col>
        </Row>
        <Table
          //    style={{ height: "300px" }}
          columns={this.props.columns}
          dataSource={this.props.data}
          scroll={{ x: 650 }}
          pagination={{ pageSize: "4" }}
        />
      </Col>
    );
  }
  render() {
    const styles = {
      card: {
        //  lineHeight: 1.25,
        backgroundColor: "#ffffff",
        //padding: "16px",
        //border: "1px solid #91D5FF",
        width: "100%",
        height: "100%",
        lineHeight: 1,
        // margin: "0px",
      },
    };
    return <Card style={styles.card}>{this.renderContent()}</Card>;
  }
}

export default GroupTable;
