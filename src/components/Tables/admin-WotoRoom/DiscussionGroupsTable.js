import React from "react";
import { Card, Row, Col, Table, Tag } from "antd";
import ExportCSVButton from "../../buttons/ExportCSV";

//Set up card with header, table, and export csv file

class DiscussionGroupsTable extends React.Component {
  
  
    renderContent() {

    //Column setup
    
    const Group_COLUMNS = [
      {
        title: "Group Number",
        dataIndex: "groupNumber",
        key: "groupNumber",
        align: "center",
        //width: 50,
        width: '15%',
      },
      {
        title: "Student",
        key: "fullName",
        render: (text, record) => (
          <h4>{`${record.firstname} ${record.lastname}`}</h4>
        ),
        //fixed: "left",
        width: '25%',
   
      },

      {
        title: "Assignment",
        dataIndex: "assignment",
        key: "assignment",
        width: '25%'
      },
      {
        title: "Stage",
        dataIndex: "stage",
        key: "stage",
        render: (stage) => <>{createTag(stage)}</>,
        width: '35%',
      },
    ];
    

    const createTag = (stage) => {
      if (stage === "Just Started") {
        return <Tag color="green" key={stage}>{`${stage}`}</Tag>;
      } else if (stage === "Debugging Solution") {
        return <Tag color="blue" key={stage}>{`${stage}`}</Tag>;
      } else if (stage === "") {
        return <p></p>;
      } else {
        return <Tag color="volcano" key={stage}>{`${stage}`}</Tag>;
      }
    };
    const { tableData } = this.props
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
            <Col span={12} align="left">
              <h2>Discussion Groups</h2>
            </Col>
            <Col span={12} align="right">
              <ExportCSVButton
                title="Export to CSV"
                data={tableData}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                indentSize = '1'
            //  childrenColumnNameName = {['child']}
                defaultExpandAllRows = 'true'
                style={{ height: "600px" }}
                pagination={{ pageSize: 50 }}
                columns={Group_COLUMNS}
                dataSource={tableData}
                scroll={{ x: 650, y: 500 }}
                expandRowByClick = 'true'
              />
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

export default DiscussionGroupsTable;
/*
 <Button  icon={<CloseCircleOutlined />} onClick={this.props.removeUser} />
*/
