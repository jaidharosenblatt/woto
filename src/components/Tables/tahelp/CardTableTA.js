import React from "react";
import { Table } from "antd";

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
      stateData: [],
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
  /*
    static getDerivedStateFromProps(props, state) {
    if (props.currentRow !== state.lastRow) {
      return {
        isScrollingDown: props.currentRow > state.lastRow,
        lastRow: props.currentRow,
      };
    }

  */
  static getDerivedStateFromProps(props, state) {
    if (props.title !== state.title) {
      return {
        title: props.title,
        stateData: state.stateData,
        stateColumns: props.columns,
      };
    }
    return null;
  }
  /*
  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.state.title) {
      this.setState({ title: nextProps.title });
      this.setState({ stateColumns: nextProps.columns });
    }
    console.log(this.state.columns);
  }
*/

  //Setup content for "Help Students" view
  renderContentEnabled() {
    //const {tableData, columns} = this.props;s
    return (
      <Table
        columns={this.state.stateColumns}
        dataSource={this.state.stateData}
        scroll={{ x: 650 }}
      />
    );
  }
  //Setup content for "Students Waiting" view
  renderContentDisabled() {
    //const {tableData, columns} = this.props;s
    return (
      <Table
        columns={this.state.stateColumns}
        dataSource={this.state.stateData}
        scroll={{ x: 650 }}
      />
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
