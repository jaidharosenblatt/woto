import React from "react";
import { Card, Row, Col, Table, Button } from "antd";
//Overall: Set up card with header, table, and Switch. MainColabComp.js
/*
@Tommy Tilton
props input:
columns data: 'props.columns'
data input: 'props.data'
*/

class CardTableTA extends React.Component {
  //Function to Determine expected wait time left.
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      stateData: null,
      stateColumns: null,
    };
  }

  getTimeLeft() {
    return 12;
  }

  componentDidMount() {
    this.setState({ title: this.props.title });
    this.setState({ stateData: this.props.data });
    this.setState({ stateColumns: this.props.columns });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.state.title) {
      this.setState({ title: nextProps.title });
      this.setState({ stateColumns: nextProps.columns });
    }
    console.log(this.state.columns);
  }

  //function to clear Queue
  onDelete = (e) => {
    // e.preventDefault();
    this.setState({ stateData: zero_Data });
    console.log(this.state.stateData);
    this.render();
  };

  //Setup content for "Help Students" view
  renderContentEnabled() {
    //const {tableData, columns} = this.props;s
    return (
      <Row align="center">
        <Col span={24}>
          <Card>
            <Row justify="left" align="top" gutter={[16, 10]}>
              <Col span={12} align="left">
                <h5>{this.state.title}</h5>
              </Col>
              <Col span={12} align="right">
                <Button
                  onClick={(e) => {
                    this.onDelete(e);
                  }}
                >
                  Clear Data
                </Button>
              </Col>
            </Row>
            <Table
              columns={this.state.stateColumns}
              dataSource={this.state.stateData}
              scroll={{ x: 650 }}
            />
          </Card>
        </Col>
      </Row>
    );
  }
  //Setup content for "Students Waiting" view
  renderContentDisabled() {
    //const {tableData, columns} = this.props;s
    return (
      <Row align="center">
        <Col span={24}>
          <Card>
            <Row justify="left" align="top" gutter={[16, 10]}>
              <h5>{this.state.title}</h5>
            </Row>
            <Row justify="center" align="middle" gutter={[16, 10]}>
              <Col span={12} align="left">
                <h4>{this.props.description}</h4>
              </Col>
              <Col span={12} align="right">
                <Button
                  onClick={(e) => {
                    this.onDelete(e);
                  }}
                >
                  Clear Data
                </Button>
              </Col>
            </Row>
            <Table
              columns={this.state.stateColumns}
              dataSource={this.state.stateData}
              scroll={{ x: 650 }}
            />
          </Card>
        </Col>
      </Row>
    );
  }
  //Return table card depending on what state
  render() {
    if (this.state.title === "Help Students") {
      return (
        <div className="tahelp-table-component">
          {this.renderContentEnabled()}
        </div>
      );
    } else {
      return (
        <div className="tahelp-table-component">
          {this.renderContentDisabled()}
        </div>
      );
    }
  }
}

export default CardTableTA;

const zero_Data = [];
