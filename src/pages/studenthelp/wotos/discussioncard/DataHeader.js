import React from "react";
import { Card, Row, Col, Button } from "antd";

const DataHeader = ({ createWoto, dataDisplay, setDataDisplay }) => {
  return (
    <Card>
      <Row align="center">
        <Col xs={24} lg={16}>
          <h1>Woto Rooms</h1>
          <h3>
            Open video rooms for you to collaborate with students on classwork
          </h3>
        </Col>
        <Col xs={24} lg={8} align="right">
          <Row gutter={4}>
            <Col span={12}>
              {dataDisplay === "cards" ? (
                <Button block onClick={() => setDataDisplay("table")}>
                  Switch to Table
                </Button>
              ) : (
                <Button block onClick={() => setDataDisplay("cards")}>
                  Switch to Cards
                </Button>
              )}
            </Col>
            <Col span={12}>
              <Button block type="primary" onClick={createWoto}>
                Create Room
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default DataHeader;
