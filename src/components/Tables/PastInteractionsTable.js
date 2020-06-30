import React from "react";
import { Card, Row, Col, Table } from "antd";
import ExportCSVButton from "../Buttons/ExportCSV";

//Set up card with header, table, and export csv file

class TableComponentPastInteractions extends React.Component {

  renderContent() {
    //const {tableData, columns} = this.props;s
    return (
    
        <Col span={24}>
          <Card>
            <Row justify="center" align="top" gutter={[16, 20]}>
              <Col span={12} align="left">
                <h2>{`${this.props.taFirstName}'s Past Interactions`}</h2>
              </Col>
              <Col span={12} align="right">
                <ExportCSVButton title="Export to CSV" data={this.props.data} />
              </Col>
            </Row>
            <Table columns={this.props.columns} dataSource={this.props.data} scroll={{ x: 650 }} />
          </Card>
        </Col>
      
    );
  }
  render() {
    return <div className="table component">{this.renderContent()}</div>;
  }
}

export default TableComponentPastInteractions;
