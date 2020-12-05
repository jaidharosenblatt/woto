import React from "react";
import { Row, Col, Space } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { defaultFields } from "../../../helpform/defaultFields";

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
 * @param {*} course
 * @returns requiredFields its required fields
 * @returns expand the property to attatch to table to make it expand
 * @returns n the cutoff for switching from regular col to an expand
 * @returns question template from the session attribute or the default if null
 */
export const seperateFields = (course) => {
  const questionTemplate = course?.questionTemplate
    ? course.questionTemplate
    : defaultFields;
  const displayCutoff = course?.displayCutoff ? course?.displayCutoff : 2;
  var requiredFields = [];
  var detailFieldsCol1 = [];
  var detailFieldsCol2 = [];

  for (var i = 0; i < questionTemplate.length; i++) {
    if (questionTemplate[i].required) {
      requiredFields.push(questionTemplate[i]);
    }
    if (i >= displayCutoff) {
      if (i % 2 === 0) {
        detailFieldsCol1.push(questionTemplate[i]);
      } else {
        detailFieldsCol2.push(questionTemplate[i]);
      }
    }
  }

  const expand = expandRow(detailFieldsCol1, detailFieldsCol2);
  return {
    requiredFields,
    expand,
    displayCutoff,
    questionTemplate,
  };
};
