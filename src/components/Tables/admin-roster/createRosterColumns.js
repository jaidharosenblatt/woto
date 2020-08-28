import React from "react";
import { Popconfirm } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import {
  convertTimeAgoString,
  convertDateString,
} from "../../../utilfunctions/timeAgo";

export const createRosterColumns = (handleDelete) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "fullName",
      fixed: "left",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "left",
      width: 200,
    },
    {
      title: "Graduation Year",
      dataIndex: "graduationYear",
      key: "year",
      align: "left",
      width: 120,
    },
    {
      title: "Last Active",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "left",
      render: (item) => {
        return <>{convertTimeAgoString(item)}</>;
      },
      width: 200,
    },
    {
      title: "Account Created",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "left",
      render: (item) => {
        return <>{convertDateString(item)}</>;
      },
      width: 140,
    },
    {
      title: "",
      align: "right",
      render: (text, record) => (
        <Popconfirm
          placement="left"
          title="Remove from this course"
          onConfirm={() => handleDelete(record.key)}
        >
          <CloseCircleOutlined style={{ marginRight: 20 }} />
        </Popconfirm>
      ),
      width: 50,
    },
  ];
};
