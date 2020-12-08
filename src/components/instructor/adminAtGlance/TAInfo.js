import React from "react";
import { Card, List, Space, Avatar, Row, Tag } from "antd";
import { DefaultProfile } from "../../../static/Images";
import "./TAInfo.css";

const TAInfo = (props) => {
  const styles = {
    chartDisplay: {
      width: "100%",
      // width: "calc(100vw - 75px)",
      height: "100%",
    },
  };
  //<Card style={{ width: "100%", height: "100%", padding: "7px" }}>
  const { name, userType, year, classes } = props.profile;
  return (
    <Card style={styles.chartDisplay}>
      <Row>
        <Space size={16}>
          <Avatar size={80} src={DefaultProfile} />
          <Space direction="vertical">
            <h2>{name}</h2>
            <p>{userType}</p>
            <p>{year}</p>
          </Space>
        </Space>
      </Row>
      <br />
      <Row>
        <Card
          className="FullWidth"
          title={<h2>Courses</h2>}
          style={{ width: "100%", height: "100%" }}
        >
          <List
            itemLayout="horizontal"
            dataSource={classes}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<p>{item.name}</p>}
                  description={<h3>{item.description}</h3>}
                />
                <Tag
                  style={{ width: "50%", borderRadius: "4px" }}
                  className="InfoTag"
                  color="blue"
                >
                  {item.position}
                </Tag>
              </List.Item>
            )}
          />
        </Card>
      </Row>
    </Card>
  );
};

export default TAInfo;
