import React from "react";
import { Card, List, Space, Avatar, Row, Tag } from "antd";
import { DefaultProfile } from "../../../../static/Images";
import "./TAInfo.css";

const TAInfo = (props) => {
  const { name, userType, year, classes } = props.profile;
  return (


  //  <div className="ta-info" styles={{height: "100%",  width: "100%"}} >
 <Card style={{ width: "100%", height: "100%" }}>
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

  //  </div>
     
   
  );
};

export default TAInfo;
