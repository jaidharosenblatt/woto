import React, { useContext } from "react";
import { Button, Space, Tooltip } from "antd";

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
  loading,
}) => {
  const { state } = useContext(HelpContext);
  return (
    <LeftRightRow
      left={
        <Space direction="vertical">
          <h1>
            Woto Rooms{" "}
            {loading ? (
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
  );
};

export default DataHeader;
