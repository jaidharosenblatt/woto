import React from "react";
import { Popconfirm } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
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
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "left",
      width: 250,
    },
    {
      title: "Graduation Year",
      dataIndex: "graduationYear",
      key: "year",
      align: "left",
    },
    {
      title: "Last Active",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "left",
      render: (item) => {
        return <>{convertTimeAgoString(item)}</>;
      },
    },
    {
      title: "Account Created",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "left",
      render: (item) => {
        return <>{convertDateString(item)}</>;
      },
    },
    {
      title: "",
      align: "right",
      render: (text, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key)}
        >
          <CloseCircleFilled style={{ color: "#FF4D50", marginRight: 20 }} />
        </Popconfirm>
      ),
    },
  ];
};
