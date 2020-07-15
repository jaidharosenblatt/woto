import React from "react";
import { Card, Row, Col, Table, Popconfirm, Space } from "antd";
import ExportCSVButton from "../../buttons/ExportCSV";
import ImportCSVButton from "../../buttons/ImportCSV";
import { CloseCircleOutlined } from "@ant-design/icons";

//Set up card with header, table, and export csv file

class RosterTAs extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
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
        align: "center",
      },
      {
        title: "Satisfaction Rate",
        dataIndex: "satisfactionRate",
        render: (text, record) => (
          <h4>{`${record.satisfactionRate * 100}%`}</h4>
        ),
        key: "satisfactionRate",
        align: "center",
      },
      {
        title: "Students Helped",
        dataIndex: "studentsHelped",
        key: "studentsHelped",
        align: "center",
      },
      {
        title: "Sessions Attended",
        dataIndex: "sessionsAttended",
        key: "sessionsAttended",
        align: "center",
      },
      {
        title: "Interaction Length (avg)",
        dataIndex: "interactionLength",
        key: "interactionLength",
        align: "center",
      },
      {
        title: "Wait Time",
        dataIndex: "waitTime",
        key: "waitTime",
        align: "center",
      },
      {
        //title: "Rating",
        title: "",
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
    // <a>Delete</a>
    this.state = {
      dataSource: this.props.tableData,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.tableData !== state.dataSource) {
      return {
        dataSource: props.tableData,
      };
    }
    return null;
  }
  /*
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    }); 
  };
*/


  renderContent() {
    const { dataSource } = this.state;
    
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
            <Col xs={24} sm={14} align="right">
              <Space direction="horizontal">
                
                <ImportCSVButton title="Import to CSV" />
                <ExportCSVButton title="Export to CSV" data={dataSource} />
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                style={{ height: "300px" }}
                pagination={{ pageSize: 50 }}
                columns={this.columns}
                dataSource={dataSource}
                scroll={{ y: 240, x: 650 }}
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

export default RosterTAs;
/*
 <Button  icon={<CloseCircleOutlined />} onClick={this.props.removeUser} />
*/
/*
<Form.Item justify='center' label="Checkbox">
                 <Switch
                    checked={!!this.state.rowSelection}
                    onChange={this.handleRowSelectionChange}
                  /> 
                </Form.Item>
*/