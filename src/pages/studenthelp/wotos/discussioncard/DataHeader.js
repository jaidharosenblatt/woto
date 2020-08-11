import React from "react";
import { Card, Button, Space } from "antd";
import LeftRightRow from "../../../../components/leftrightrow/LeftRightRow";

const DataHeader = ({ inWoto, createWoto, dataDisplay, setDataDisplay }) => {
  return (
    <Card>
      <LeftRightRow
        left={
          <Space direction="vertical">
            <h1>Woto Rooms</h1>
            <h3>
              Open video rooms for you to collaborate with students on classwork
            </h3>
          </Space>
        }
        right={
          <Space>
            {dataDisplay === "cards" ? (
              <Button onClick={() => setDataDisplay("table")}>
                Table View
              </Button>
            ) : (
              <Button onClick={() => setDataDisplay("cards")}>
                Cards View
              </Button>
            )}

            <Button disabled={inWoto} type="primary" onClick={createWoto}>
              Create Room
            </Button>
          </Space>
        }
      />
    </Card>
  );
};

export default DataHeader;
