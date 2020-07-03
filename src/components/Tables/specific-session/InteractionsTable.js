import React from "react";
import { Card, Row, Col, Table, Tag } from "antd";
import ExportCSVButton from "../../buttons/ExportCSV";
import { ThumbsDown, ThumbsUp } from "../../../static/Images";

//Set up card with header, table, and export csv file

class InteractionsTable extends React.Component {
    
  renderContent() {

    const fetchImage = (rate) => {
        if (rate === "thumbsUp") {
          return ThumbsUp;
        } else {
          return ThumbsDown;
        }
      };
      
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
      
      //Column setup
      const INTERACTIONS_COLUMNS = [
        {
          title: "Student",
          key: "fullName",
          render: (text, record) => (
            <h4>{`${record.firstname} ${record.lastname}`}</h4>
          ),
          fixed: "left",
          width: 100,
        },
        {
          title: "HW #",
          dataIndex: "hwNumber",
          key: "hwNumber",
        },
        {
          title: "Problem #",
          dataIndex: "problemNumber",
          key: "problemNumber",
        },
        {
          title: "Stage",
          dataIndex: "stage",
          key: "stage",
          render: (stage) => <>{createTag(stage)}</>,
          width: 150,
        },
        {
          title: "Time Waited (minutes)",
          dataIndex: "waitTime",
          key: "waitTime",
        },
        {
          title: "Interaction Length",
          dataIndex: "interactionLength",
          key: "interactionLength",
        },
        {
          title: "Time",
          dataIndex: "time",
          key: "time",
        },
        {
          title: "Rating",
          key: "rating",
          render: (text, record) => (
            <img src={fetchImage(record.rating)} alt="Rating" />
          ),
        },
      ];
      
    //const {tableData, columns} = this.props;s
    return (
    
        <Col span={24}>
          <Card style={{width: "100%"}}>
            <Row justify="center" align="top" gutter={[16, 20]}>
              <Col span={12} align="left">
        
                <h2>Interactions</h2>
              </Col>
              <Col span={12} align="right">
                <ExportCSVButton title="Export to CSV" />
              </Col>
            </Row>
            <Table columns={INTERACTIONS_COLUMNS} dataSource={this.props.tableData} scroll={{ x: 650 }} />
          </Card>
        </Col>
      
    );
  }
  render() {
    return <div className="table component">{this.renderContent()}</div>;
  }
}

export default InteractionsTable;
