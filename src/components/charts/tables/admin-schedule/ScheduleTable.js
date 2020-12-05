import React from "react";
import { Card, Row, Col, Table, Tag, Popconfirm } from "antd";
import ExportCSVButton from "../../../buttons/ExportCSV";
import { CloseCircleOutlined } from "@ant-design/icons";
//Set up card with header, table, and export csv file

class ScheduleTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Day of Week",
        key: "day",
        dataIndex: "day",
        //    align: "Left",

        //   width: "25%",
      },
      {
        title: "Start Time",
        dataIndex: "startTime",
        key: "startTime",
        align: "center",
      },
      {
        title: "End Time",
        dataIndex: "endTime",
        key: "endTime",
        align: "center",
      },

      {
        title: "# Teaching Assistants",
        dataIndex: "teachingAssistants",
        render: (text, record) => <h4>{`${text.length}`}</h4>,
        key: "numTeachingAssistants",
        align: "center",
      },
      {
        title: "Teaching Assistants",
        dataIndex: "teachingAssistants",
        key: "teachingAssistants",
        render: (teachingAssistants) => <>{createTag(teachingAssistants)}</>,
      },
      {
        title: "Start Date",
        dataIndex: "startDate",
        key: "startDate",
        align: "center",
      },
      {
        title: "End Date",
        dataIndex: "endDate",
        key: "endDate",
        align: "center",
      },
      {
        //title: "Rating",
        title: "Delete",
        align: "center",
        render: (text, record) => (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => this.props.removeUser(record.key)}
          >
            <CloseCircleOutlined />
          </Popconfirm>
        ),
      },
    ];
    /*
    const separate = (teachingAssistants) => {
      const listItems = teachingAssistants.map((ta) => (
        <li key={ta}>{`${ta}`}</li>
      ));
      return listItems;
    };
*/
    const createTag = (stage) => {
      return (
        <>
          {stage.map((ta) => (
            <Tag
              style={{ marginBottom: "5px" }}
              color="blue"
              key={ta}
            >{`${ta}`}</Tag>
          ))}
        </>
      );
      // for(let i = 0; i < stage.length; i++){
      //    return <Tag color="blue" key={stage[i]}>{`${stage[i]}`}</Tag>;
      //    }

      //   return <Tag color="green" key={stage}>{`${stage}`}</Tag>;
      //  return <Tag color="blue" key={stage}>{`${stage}`}</Tag>;

      //

      //return <p></p>;

      // return <Tag color="volcano" key={stage}>{`${stage}`}</Tag>;
    };
  }

  renderContent() {
    //const {tableData, columns} = this.props;s
    return (
      <Col span={24}>
        <Row gutter={[16, 20]}>
          <Col span={12} align="left">
            <h2>{`${this.props.title}`}</h2>
          </Col>
          <Col span={12} align="right">
            <ExportCSVButton
              title="Export to CSV"
              data={this.props.tableData}
            />
          </Col>
        </Row>
        <Table
          columns={this.columns}
          dataSource={this.props.tableData}
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

export default ScheduleTable;
