import React from "react";
import { Row, Col, Select, Card } from "antd";
import DataPieChart from "./DataPieChart";

/**
   * Card for pie chart. Select between concepts and assignment
   * @param title metric name ex "Wait Time"
  
   */

class PieChartCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: "concepts" };
  }

  onDataSourceChange = (e) => {
    console.log(this.state);
    this.setState({dataSource: e});
    
    };
    
  




  getData() {
    if(this.state.dataSource==="concepts"){
        return this.props.conceptData;
    } else {
        return this.props.assignmentData;
    }
};

  render() {
    
    const select = (
      <Select
        align = "left"
        onChange={this.onDataSourceChange}
        defaultValue={this.state.dataSource}
        style={{ width: "100%", maxWidth: "150px" }}
        value={this.state.dataSource}
      >
        <Select.Option key="concepts">
          <p>Concepts</p>
        </Select.Option>
        <Select.Option key="assignments">
          <p>Assignments</p>
        </Select.Option>
      </Select>
    );

  

    const styles = {
      card: {
        //lineHeight: 2,
        backgroundColor: "#ffffff",
        padding: "0px",
       // border: ".5px solid #91D5FF",
        height: "100%",
        
      },

      paragraph1: {
        color: "#000000",
        padding: "0px",
      },
      paragraph2: {
        color: "#000000",
        padding: "10px",
      },
      data: {
        color: "#000000",
      },
    };

    return (
      <Card style={styles.card}>
        <Row gutter={8}>
          <Col span={12} align="left">
            <h5>Questions</h5>
          </Col>
          <Col span={12} align="right">
            {select}
          </Col>
        </Row>
        <Row >
          <Col align="center" span={24}>
              <DataPieChart data={this.getData()} /> 
            </Col>
        </Row>
      </Card>
    );
  }
}

export default PieChartCard;

//file pagedetailmap links up pages
