import React from "react";
import { Card, Row, Col, Table, Switch } from "antd";

//Overall: Set up card with header, table, and Switch. MainColabComp.js
/*
@Tommy Tilton
props input:
columns data: 'props.columns'
data input: 'props.data'
*/

class CardTableSetup extends React.Component {
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
      <Row align="center">
        <Col span={24}>
          <Card>
            <Row justify="left" align="top" gutter={[16, 10]}>
              <h5>Collaborate</h5>
            </Row>
            <Row justify="center" align="middle" gutter={[16, 10]}>
              <Col span={12} align="left">
                <h4>{`You still have ~${this.getTimeLeft()} minutes until a TA can see you.`}</h4>
                <h4>Try working with your classmates while you wait!</h4>
              </Col>
              <Col span={8} align="right">
                <h4>Display my question</h4>
              </Col>
              <Col span={4} align="left">
                <Switch defaultChecked onChange={this.displayQuestion} />
              </Col>
            </Row>
            <Table
              columns={this.props.columns}
              dataSource={this.props.data}
              scroll={{ x: 650 }}
            />
          </Card>
        </Col>
      </Row>
    );
  }
  render() {
    return <div className="table component">{this.renderContent()}</div>;
  }
}

export default CardTableSetup;
