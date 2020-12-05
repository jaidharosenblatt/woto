import React from "react";
import { Card, Row, Col } from "antd";
import {
  LineChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

class ChartWotoRoom extends React.Component {

  renderContent() {
    
    const { dataList } = this.props;

    const styles = {
        card: {
          lineHeight: 1.25,
          backgroundColor: "#ffffff",
         // padding: "10px",
          //border: "1px solid #91D5FF",
          height: "100%",
          margin: "0px"
          //width: "100%"
        },
      }

    return (
      <Card style={styles.card} title="Woto Room Traffic">
        
        
        <br></br>
        <Row>
          <Col span={24}>
            <ResponsiveContainer height={250}>
              <LineChart
               
                data={dataList}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="session" />
                <YAxis axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="students" stroke="#40A9FF" />
                <Line type="monotone" dataKey="groups" stroke="#91d5ff" />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Card>
    );
  }

  render() {
    return <>{this.renderContent()}</>;
  }
}

//const dataUnitMap = { groups: "# Groups", students: "# Students" };

function CustomTooltip({ payload, label, active, units }) {
  if (active) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          border: "1px solid rgb(169, 169, 169, 0.8)",
          borderRadius: "2px",
        }}
      >
        <p
          className="label"
          style={{ padding: "10px" }}
        >{`Session ${label}:`}</p>
        <p
          className="label"
          style={{ padding: "10px", color:"#40A9FF" }}
        >{`${payload[0].value} students`}</p>

        <p className="label" style={{ padding: "10px", color: "#91d5ff" }}>
          {`${payload[1].value} groups`}
        </p>
      </div>
    );
  }

  return null;
}

//const dataUnitMap = {studentTraffic: "minutes", groupTraffic: "groups"};

export default ChartWotoRoom;
