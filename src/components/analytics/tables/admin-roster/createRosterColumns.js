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
      sorter: (a, b) => a.name > b.name,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "left",
      sorter: (a, b) => a.email > b.email,
    },
    {
      title: "NetId",
      dataIndex: "netId",
      key: "netId",
      align: "left",
      sorter: (a, b) => a.netId > b.netId,
    },
    {
      title: "Last Active",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "left",
      sorter: (a, b) => a.updatedAt > b.updatedAt,
      render: (item) => {
        return <>{util.convertTimeAgoString(item)}</>;
      },
    },
    {
      title: "Account Created",
      dataIndex: "avatar",
      key: "createdAt",
      align: "center",
      sorter: {
        compare: (a, b) => (a.avatar === b.avatar ? 0 : a.avatar ? -1 : 1),
        multiple: 1,
      },

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
