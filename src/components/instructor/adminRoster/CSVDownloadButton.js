import React from "react";
import { Button } from "antd";
import { CSVLink } from "react-csv";

export default function CSVDownloadButton({ data }) {
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
        Export to CSV
      </CSVLink>
    </Button>
  );
}
