import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table, Space } from "antd";

import {
  DownOutlined,
  UpOutlined,
  LoadingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

//import API from "../../../api/API";
//import { AuthContext } from "../../../contexts/AuthContext";
//import { renderItemsToTags } from "../../../utilfunctions/renderItemsToTags";
import { createColumns } from "../collabtable/createColumns";
import "../collabtable/collabtable.css";
import { GlobeImage } from "../../../static/LoadedImages";
import { defaultFields } from "../../helpform/defaultFields";

/**
 * @matthewsclar
 * Table for TAs to view student queue. Uses a current question passed
 * down form the Help page and GETs table data based on the course id
 *
 * Imports columns, header, and sorting from within this folder
 *
 * @param {props} queueTime expected wait time null if not currently in queue
 * @param {props} active whether there is active office hours for this course
 * @param {props} course course object containing code, id, and questionTemplate
 * @param {props} setStage change the stage of the help process.
 * @param {props} taPage if being created in ta page

 */
const SessionTable = (props) => {
  //const { state } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  var n = props.course.sessionAttribute ? props.course.sessionAttribute.n : 2;

  var detailFieldsCol1 = [];
  var requiredFields = [];
  var detailFieldsCol2 = [];
  var questionTemplate =
    props.course.sessionAttributes &&
    props.course.sessionAttributes.questionTemplate;

  if (questionTemplate === undefined) {
    questionTemplate = defaultFields;
  }
  for (var i = 0; i < questionTemplate.length; i++) {
    if (questionTemplate[i].required) {
      requiredFields.push(questionTemplate[i]);
    }
    if (i >= n) {
      if (i % 2 === 0) {
        detailFieldsCol1.push(questionTemplate[i]);
      } else {
        detailFieldsCol2.push(questionTemplate[i]);
      }
    }
  }

  // Load data on component mount
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const helpStudent = (values) => {
    console.log("help!", values);
  };

  const loadData = () => {
    setLoading(true);
    setData([
      {
        key: "1",
        name: "Matthew Sclar",
        createdAt: "11:15 PM",
        assignment: "1",
        stage: "Debugging Solution",
        meetingURL: "https://zoom.us/",
      },
      {
        key: "2",
        name: "Tommy Tilton",
        createdAt: "11:30 PM",
        assignment: "2",
        stage: "Just Started",
        meetingURL: "https://zoom.us/",
      },
      {
        key: "3",
        name: "Noah Karpel",
        createdAt: "11:45 PM",
        assignment: "1",
        stage: "Understand Question",
        meetingURL: "https://zoom.us/",
      },
      {
        key: "4",
        name: "Kaden Rosenblatt",
        createdAt: "12:00 PM",
        assignment: "1",
        stage: "Debugging Solution",
        meetingURL: "https://zoom.us/",
      },
    ]);
    setLoading(false);
    // try {
    //   const response = await API.getWotoData(props.course._id);
    //   var formattedData = [];
    //   console.log(response);
    //   response.forEach((question, count) => {
    //     if (!question.archived) {
    //       const isYou = question.owner._id === state.user._id;
    //       if (isYou) {
    //         setActiveQuestion(true);
    //         props.setQuestion(question);
    //       }
    //       const name = isYou
    //         ? `${question.owner.name.split(" ")[0]} (you)`
    //         : question.owner.name.split(" ")[0];

    //       //CHECK FOR OLD DATA, FIELDS COULD BE CHANGED

    //       var bool = true;
    //       for (var i = 0; i < requiredFields.length; i++) {
    //         if (
    //           Object.keys(question.description).includes(
    //             requiredFields[i].label.toLowerCase()
    //           )
    //         ) {
    //           continue;
    //         } else {
    //           bool = false;
    //           break;
    //         }
    //       }
    //       if (bool) {
    //         var temp = {
    //           key: count,
    //           name: name,
    //           id: question._id,
    //           isYou: isYou,
    //           lastActive: new Date(question.updatedAt),
    //           size: question.participants.length,
    //           description: question.description,
    //           ...question.description,
    //         };

    //         formattedData.push(temp);
    //       }
    //     }
    //   });
    //   setLoading(false);
    // } catch (error) {
    //   console.error(error);
    //   setLoading(false);
    // }
    // //sortTable(formattedData, currentQuestion, maxSize);
    // setData(formattedData);
  };

  const table = (
    <Table
      className="collab-table"
      loading={loading}
      locale={{
        emptyText: (
          <div className="empty-collab-table">
            <p>Be the first to create a Woto Room</p>
            <GlobeImage className="waiting-image" />
          </div>
        ),
      }}
      expandable={{
        expandedRowRender: (row) => {
          return (
            <Row align="middle">
              <Col span={12} align="left">
                <Space direction="vertical">
                  {detailFieldsCol1.map((field) => {
                    if (field.label) {
                      return (
                        <p key={field.label}>{`${field.label}: ${
                          row[field.label.toLowerCase()]
                        }`}</p>
                      );
                    }
                    return <></>;
                  })}
                </Space>
              </Col>
              <Col span={12} align="right">
                <Space direction="vertical">
                  {detailFieldsCol2.map((field) => {
                    if (field.label) {
                      return (
                        <p key={field.label}>{`${field.label}: ${
                          row[field.label.toLowerCase()]
                        }`}</p>
                      );
                    }
                    return <></>;
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
      }}
      columns={createColumns(
        null,
        null,
        null,
        null,
        null,
        props.course.sessionAttributes &&
          props.course.sessionAttributes.questionTemplate,
        n,
        true,
        helpStudent
      )}
      dataSource={data}
      scroll={{ x: 650 }}
      rowClassName={(record) => record.isYou && "first-row"}
    />
  );

  return (
    <div>
      <Row align="center">
        <Col span={24}>
          {props.taPage ? (
            <Space direction="vertical" style={{ width: "100%" }}>
              <h2>
                Help Students{" "}
                {props.loading ? (
                  <LoadingOutlined />
                ) : (
                  <ReloadOutlined onClick={loadData} />
                )}
              </h2>

              {table}
            </Space>
          ) : (
            <Card title="Help Students">{table}</Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SessionTable;
