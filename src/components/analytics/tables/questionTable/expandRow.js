import React from "react";
import { Row, Col, Space } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

/**
 * Expand row entry and seperate fields into two cols
 * @param {*} col1 list of fields to put on left side of expand
 * @param {*} col2 list of fields to put on right side of expand
 */
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

/**
 * Seperate fields of course
 * @param {Array} questionTemplate from session or course
 * @returns {Array} inTable fields to display in cols
 * @returns {JSX} expand unused fields into a row
 */
export const separateFields = (questionTemplate) => {
  let inTable = [];
  let detailFieldsCol1 = [];
  let detailFieldsCol2 = [];
  let index = 0;

  questionTemplate.forEach((field) => {
    if (field.showInTable) {
      inTable.push(field);
    } else {
      if (index % 2 === 0) {
        detailFieldsCol1.push(field);
      } else {
        detailFieldsCol2.push(field);
      }
      index++;
    }
  });
  console.log(detailFieldsCol2);

  const expand = expandRow(detailFieldsCol1, detailFieldsCol2);
  return {
    expand,
    inTable,
  };
};
