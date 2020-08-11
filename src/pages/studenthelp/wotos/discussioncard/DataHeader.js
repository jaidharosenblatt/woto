import React from "react";
import { Card, Row, Col, Button, Space } from "antd";

const DataHeader = ({ inWoto, createWoto, dataDisplay, setDataDisplay }) => {
  const buttons = (
    <Space>
      {dataDisplay === "cards" ? (
        <Button onClick={() => setDataDisplay("table")}>Table View</Button>
      ) : (
        <Button onClick={() => setDataDisplay("cards")}>Cards View</Button>
      )}

      <Button disabled={inWoto} type="primary" onClick={createWoto}>
        Create Room
      </Button>
    </Space>
  );
  return (
    <Card>
      <Row align="center">
        <Col xs={24} md={16}>
          <h1>Woto Rooms</h1>
          <h3>
            Open video rooms for you to collaborate with students on classwork
          </h3>
        </Col>
        <Col xs={0} md={8} align="right">
          {buttons}
        </Col>
        <Col xs={24} md={0} align="left">
          {buttons}
        </Col>
      </Row>
    </Card>
  );
};

export default DataHeader;
