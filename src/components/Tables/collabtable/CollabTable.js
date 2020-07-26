import React, { useContext, useState, useEffect } from "react";
import { Card, Row, Col, Table } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import API from "../../../api/API";
import { AuthContext } from "../../../contexts/AuthContext";
import { renderItemsToTags } from "../../../utilfunctions/renderItemsToTags";
import { createColumns } from "./createColumns";
import CollabTableHeader from "./CollabTableHeader";
import { sortTable } from "./sortTable";
import "./collabtable.css";

/**
 * @jaidharosenblatt
 * Table for collaborating with other students. Uses a current question passed
 * down form the Help page and GETs table data based on the course id
 *
 * Imports columns, header, and sorting from within this folder
 *
 * @param {props} queueTime expected wait time null if not currently in queue
 * @param {props} active whether there is active office hours for this course
 * @param {props} course course object containing code and id
 * @param {props} question user submitted question from Help parent component
 * @param {props} setQuestion modify state variable "question"
 * @param {props} setStage change the stage of the help process.
 */
const CollabTable = (props) => {
  const maxSize = 3;
  const { state } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentQuestion = props.question && props.question.details;

  // Load data on component mount
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Join a Woto and leave your previous one
   * @param {value} id of woto to join
   */
  const joinDiscussions = async (value) => {
    try {
      const response = await API.joinDiscussion(value.id);
      // Remove current current if it exists
      if (props.question && props.question._id) {
        handleEdit({ archived: true }, props.question._id);
      }
      loadData();
      console.log(response);
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  /**
   * Update a Woto
   * @param {*} values fields to update
   * @param {*} id of current discussion
   */
  const handleEdit = async (values, id) => {
    const res = await API.editDiscussion(id, values);
    //Set current as question if it was not archived
    props.setQuestion(res);
    loadData();
  };

  /**
   * Submit a new Woto
   * @param {*} values fields from new Woto
   */
  const handleSubmit = (values) => {
    props.askQuestion(values);
    loadData();
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await API.getWotoData(props.course._id);
      var formattedData = [];
      response.forEach((question, count) => {
        if (!question.archived) {
          const isYou = question.owner._id === state.user._id;
          const name = isYou
            ? `${question.owner.name.split(" ")[0]} (you)`
            : question.owner.name.split(" ")[0];

          var temp = {
            key: count,
            name: name,
            assignment: question.description.assignment,
            createdAt: new Date(question.createdAt),
            size: question.participants.length,
            concepts: question.description.concepts,
            stage: question.description.stage,
            meetingUrl: question.description.zoomlink,
            details: question.description.details,
            id: question._id,
            description: question.description,
            isYou: isYou,
          };
        }
        formattedData.push(temp);
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    sortTable(formattedData, currentQuestion, maxSize);
    setData(formattedData);
  };

  return (
    <div>
      <Row align="center">
        <Col span={24}>
          <Card
            title={
              <CollabTableHeader
                questionNotArchived={props.question && !props.question.archived}
                courseCode={props.course.code}
                loading={loading}
                loadData={loadData}
                queueTime={props.queueTime}
                currentQuestion={currentQuestion}
                handleSubmit={handleSubmit}
              />
            }
          >
            <Table
              className="collab-table"
              loading={loading}
              locale={{ emptyText: "Be the first to join the Woto Room" }}
              expandable={{
                expandedRowRender: (row) => {
                  return (
                    <Row align="middle">
                      <Col span={12} align="left">
                        {row.details && <p>{`Details: ${row.details}`}</p>}
                      </Col>
                      <Col span={12} align="right">
                        {renderItemsToTags(row.concepts)}
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
                currentQuestion,
                handleEdit,
                joinDiscussions,
                maxSize
              )}
              dataSource={data}
              scroll={{ x: 650 }}
              rowClassName={(record) => record.isYou && "first-row"}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CollabTable;
