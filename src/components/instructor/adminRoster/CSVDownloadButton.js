import React from "react";
import { Button } from "antd";
import { CSVLink } from "react-csv";
import { DownloadOutlined } from "@ant-design/icons";

export default function CSVDownloadButton({ data, isStudent }) {
  const allowedFields = [
    "createdAt",
    "majors",
    "minors",
    "name",
    "netId",
    "email",
    "verified",
    "updatedAt",
  ];
  const cleanedData = data.map((user) => {
    const keys = Object.keys(user);
    let cleanUser = {};
    cleanUser.role = isStudent ? "student" : "TA";
    keys.forEach((key) => {
      if (allowedFields.includes(key)) {
        cleanUser[key] = user[key];
      }
    });

    return cleanUser;
  });

  return (
    <Button>
      <CSVLink data={cleanedData} filename="RosterData">
        <DownloadOutlined /> Export CSV
      </CSVLink>
    </Button>
  );
}
