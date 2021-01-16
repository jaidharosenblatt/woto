import React from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import util from "../../../../util";
import { Button, Popconfirm } from "antd";

export const createRosterColumns = (handleDelete) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "fullName",
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "left",
    },
    {
      title: "NetId",
      dataIndex: "netId",
      key: "netId",
      align: "left",
    },
    {
      title: "Last Active",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "left",
      render: (item) => {
        return <>{util.convertTimeAgoString(item)}</>;
      },
    },
    {
      title: "Account Created",
      dataIndex: "avatar",
      key: "createdAt",
      align: "center",
      render: (verified) => {
        if (verified) {
          return <CheckOutlined />;
        }
        return <CloseOutlined />;
      },
    },
    {
      title: "",
      align: "right",
      render: (text, record) => (
        <Popconfirm
          placement="left"
          title="Remove from this course"
          onConfirm={() => handleDelete(record._id)}
        >
          <Button>Remove</Button>
        </Popconfirm>
      ),
      width: 50,
    },
  ];
};
