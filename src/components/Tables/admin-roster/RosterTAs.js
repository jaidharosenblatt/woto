import React from "react";
import { Card, Row, Col, Table, Tag, Button, Icon } from "antd";
import ExportCSVButton from "../../buttons/ExportCSV";
import ImportCSVButton from "../../buttons/ImportCSV";
import AddStudentOrTA from "../../buttons/AddStudentOrTA"
import { CloseCircleOutlined } from "@ant-design/icons";
import { CloseCircle } from "../../../static/Images";

//Set up card with header, table, and export csv file

class RosterTAs extends React.Component {
  renderContent() {
    /*
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
      */
    //Column setup
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
        title: "Year",
        dataIndex: "year",
        key: "year",
      },
      {
        title: "Satisfaction Rate",
        dataIndex: "satisfactionRate",
        render: (text, record) => (
          <h4>{`${record.satisfactionRate * 100}%`}</h4>
        ),
        key: "satisfactionRate",
      },
      {
        title: "Students Helped",
        dataIndex: "studentsHelped",
        key: "studentsHelped",
      },
      {
        title: "Sessions Attended",
        dataIndex: "sessionsAttended",
        key: "sessionsAttended",
      },
      {
        title: "Interaction Length (avg)",
        dataIndex: "interactionLength",
        key: "interactionLength",
      },
      {
        title: "Wait Time",
        dataIndex: "waitTime",
        key: "waitTime",
      },
      {
        //title: "Rating",
        key: "delete",
        render: (record) => (
          <Button
            value={record.firstname}
            target={record.firstname}
            type="text"
            icon={<CloseCircleOutlined />}
            onClick={(record) => this.props.removeUser(record)}
          />
          // <img key={record.firstname} src={CloseCircle} onClick={() => this.props.removeUser()} />
        ),
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
            <Col xs={24} sm={10} align="left">
              <h2>Teaching Assistants</h2>
            </Col>
            <Col xs={12} sm={8} align="right">
              <ImportCSVButton title="Import to CSV" />
            </Col>
            <Col xs={12} sm={6} align="center">
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
          <Row align="top">
            <Col align="center" span={24}>
              <AddStudentOrTA isStudent="false" title="Add TA" />
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

export default RosterTAs;
/*
 <Button  icon={<CloseCircleOutlined />} onClick={this.props.removeUser} />
*/
