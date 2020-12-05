import React from "react";
import { Card, Row, Col, Table } from "antd";
import ExportCSVButton from "../../buttons/ExportCSV";

//Set up card with header, table, and export csv file

class ScheduleHelperTable extends React.Component {
  renderContent() {
    //const {tableData, columns} = this.props;s
    return (
      <Col span={24}>
        <Row gutter={[16, 20]}>
          <Col span={12} align="left">
            <h2>{`${this.props.title}`}</h2>
          </Col>
          <Col span={12} align="right">
            <ExportCSVButton title="Export to CSV" data={this.props.data} />
          </Col>
        </Row>
        <Table
          columns={this.props.columns}
          dataSource={this.props.data}
          scroll={{ x: 400 }}
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
        height: "100%",
        lineHeight: 1.25,
        margin: "0px",
      },
    };
    //  return <div className="table-component">{this.renderContent()}</div>;
    return <Card style={styles.card}> {this.renderContent()} </Card>;
  }
}

export default ScheduleHelperTable;
