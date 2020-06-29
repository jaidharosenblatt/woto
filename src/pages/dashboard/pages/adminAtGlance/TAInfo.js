import React from "react";
import { Card, List, Space, Avatar, Row, Tag } from "antd";
import { DefaultProfile } from "../../../../static/Images";
import "./TAInfo.css";

const TAInfo = (props) => {
  const { name, userType, year, classes } = props.profile;
  return (
    <Row align="center">
      <Card style={{ width: 700 }}>
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
        <Row>
          <Card className="FullWidth" title={<h2>Courses</h2>}>
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
                    style={{ borderRadius: "4px" }}
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
    </Row>
  );
};

export default TAInfo;
