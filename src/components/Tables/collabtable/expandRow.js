import React from "react";
import { Row, Col, Space } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

export const expandRow = (col1, col2) => {
  return {
    expandedRowRender: (row) => {
      return (
        <Row align="middle">
          <Col span={12} align="left">
            <Space direction="vertical">
              {col1.map((field) => {
                const value = row[field.label.toLowerCase()];
                if (field.label && value) {
                  return <p key={field.label}>{`${field.label}: ${value}`}</p>;
                }
                return null;
              })}
            </Space>
          </Col>
          <Col span={12} align="right">
            <Space direction="vertical">
              {col2.map((field) => {
                const value = row[field.label.toLowerCase()];
                if (field.label && value) {
                  return <p key={field.label}>{`${field.label}: ${value}`}</p>;
                }
                return null;
              })}
            </Space>
          </Col>
        </Row>
      );
    },
    rowExpandable: (row) =>
      row.details !== undefined || row.concepts !== undefined,
    expandIcon: ({ expanded, onExpand, record }) =>
      expanded ? (
        <DownOutlined onClick={(e) => onExpand(record, e)} />
      ) : (
        <UpOutlined onClick={(e) => onExpand(record, e)} />
      ),
  };
};
