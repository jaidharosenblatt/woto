import React, { useContext } from "react";
import { Card, Button, Space, Tooltip } from "antd";
import LeftRightRow from "../../../../components/leftrightrow/LeftRightRow";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { HelpContext } from "../../util/HelpContext";
const DataHeader = ({
  refresh,
  inWoto,
  createWoto,
  dataDisplay,
  setDataDisplay,
  createWotoButton,
}) => {
  const { state } = useContext(HelpContext);
  return (
    <Card>
      <LeftRightRow
        left={
          <Space direction="vertical">
            <h1>
              Woto Rooms{" "}
              {state.loading ? (
                <LoadingOutlined />
              ) : (
                <ReloadOutlined onClick={refresh} />
              )}
            </h1>
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

            {inWoto ? (
              <Tooltip title="You must leave your existing room">
                <Button disabled>Create Room</Button>
              </Tooltip>
            ) : createWotoButton ? (
              createWotoButton
            ) : (
              <Button type="primary" onClick={createWoto}>
                Create Room
              </Button>
            )}
          </Space>
        }
      />
    </Card>
  );
};

export default DataHeader;
