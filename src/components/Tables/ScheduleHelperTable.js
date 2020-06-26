import React from "react";
import { Card, Row, Col, Table, Button, Tag, Space } from "antd";
import ExportCSVButton from "../Buttons/ExportCSV";

//Set up card with header, table, and export csv file

class ScheduleHelperTable extends React.Component {
  constructor(props) {
    super(props);
  }

  renderContent() {

    const styles = {
      card: {
        lineHeight: 1.25,
        backgroundColor: "#ffffff",
        padding: "0px",
        //border: "1px solid #91D5FF",
        height: "100%"
      },
    }
    //const {tableData, columns} = this.props;s
    return (
      <Row align="center">
        <Col span={24}>
          <Card style={styles.card}>
            <Row justify="center" gutter={[16, 20]}>
              <Col span={12} align="left">
                <h2>{`${this.props.title}`}</h2>
              </Col>
              <Col span={12} align="right">
                <ExportCSVButton title="Export to CSV" data={this.props.data} />
              </Col>
            </Row>
            <Table columns={this.props.columns} dataSource={this.props.data} scroll={{ x: 650 }} />
          </Card>
        </Col>
      </Row>
    );
  }
  render() {
    return <div className="table component">{this.renderContent()}</div>;
  }
}

export default ScheduleHelperTable;
