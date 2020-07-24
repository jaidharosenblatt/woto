import React, { useContext, useState, useEffect } from "react";
import { Card, Row, Col, Table, Space, Tag, Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import "./collabtable.css";
import API from "../../../api/API";
import { AuthContext } from "../../../contexts/AuthContext";
import EditSubmission from "../../buttons/EditSubmission";
/**
 * @tommytilton @jaidharosenblatt
 * Render a collab table based on static data + a new question
 * @param {props} queueTime expected wait time null if not currently in queue
 * @param {props} active whether there is active office hours for this course
 * @param {props} courseName course code to display ex "CS230"
 * @param {props} question user submitted question from Help parent component
 * @param {props} setQuestion modify state variable "question"
 * @param {props} setStage change the stage of the help process.
 */
const CollabTable = (props) => {
  const maxSize = 2;
  const { state } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const joinDiscussions = async (value) => {
    try {
      const response = await API.joinDiscussion(value.id);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (values, id) => {
    const res = await API.editDiscussion(id, values);
    console.log(res);
    loadData();
  };

  //Convert from UTC to AM/PM hour min time
  function convertCreatedAt(createdAt) {
    const time = createdAt.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return time;
  }

  function filterData(data) {
    const NINETY_MINS = 90 * 60 * 1000;

    data.sort(function(a, b) {
      //Check if one of the submissions is yours and the other is not
      if (a.isYou && !b.isYou) {
        return -1;
      }
      if (b.isYou && !a.isYou) {
        return 1;
      }
      // Check if two values are greater than 90 mins between
      if (Math.abs(a.createdAt - b.createdAt) > NINETY_MINS) {
        return 1;
      }

      if (a.size >= maxSize && b.size < maxSize) {
        return 1;
      }
      if (b.size >= maxSize && a.size < maxSize) {
        return -1;
      }

      //Check if one of the submissions matches assignment and other doesn't
      if (
        a.assignment[0] === props.question.assignment[0] &&
        b.assignment[0] !== props.question.assignment[0]
      ) {
        return -1;
      }
      if (
        b.assignment[0] === props.question.assignment[0] &&
        a.assignment[0] !== props.question.assignment[0]
      ) {
        return 1;
      }
      //Check if one of the submissions matches stage and other doesn't
      if (
        a.stage === props.question.stage &&
        b.stage !== props.question.stage
      ) {
        return -1;
      }
      if (
        b.stage === props.question.stage &&
        a.stage !== props.question.stage
      ) {
        return 1;
      }

      return 0;
    });
  }

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
    filterData(formattedData);
    setData(formattedData);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.course._id, state.user.name, props.question]);

  //Collumn Setup
  const columns = [
    {
      title: "Group Lead",
      dataIndex: "name",
      key: "name",
      width: 90,
    },
    {
      title: "Submitted",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 50,
      align: "center",
      render: (createdAt) => {
        return <>{convertCreatedAt(createdAt)}</>;
      },
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 50,
      align: "center",
      render: (size) => {
        return <>{`${size}/${maxSize}`}</>;
      },
    },

    {
      title: "Assignment",
      dataIndex: "assignment",
      key: "assignment",
      width: 80,
      align: "left",
      render: (assignments) => {
        if (Array.isArray(assignments)) {
          if (assignments[0] === props.question.assignment[0]) {
            return <p>{assignments[0]}</p>;
          } else {
            return <>{assignments[0]}</>;
          }
        } else {
          return <> {assignments}</>;
        }
      },
    },

    {
      title: "Stage",
      dataIndex: "stage",
      key: "stage",
      width: 100,
      render: (stage) => {
        if (stage === props.question.stage) {
          return <p>{stage}</p>;
        } else {
          return <>{stage}</>;
        }
      },
    },
    {
      dataIndex: "meetingUrl",
      key: "meetingUrl",
      align: "right",
      width: 180,
      render: (meetingUrl, row) => {
        if (row.isYou) {
          return (
            <EditSubmission
              handleEdit={(values) => handleEdit(values, row.id)}
              question={row.description}
            />
          );
        }
        return (
          <Button
            block
            type="primary"
            onClick={() => joinDiscussions(row)}
            href={meetingUrl}
            target="_blank"
          >
            Join Room
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Row align="center">
        <Col span={24}>
          <Card
            title={
              <Row align="middle">
                <Space direction="vertical">
                  <h2>Work Together</h2>
                  <p>
                    {props.queueTime
                      ? `You still have ${props.queueTime} minutes until a TA can see you. Try working with your classmates while you wait!`
                      : "Open room for you to collaborate with peers"}
                  </p>
                </Space>
              </Row>
            }
          >
            <Table
              className="collab-table"
              loading={loading}
              expandable={{
                expandedRowRender: (row) => {
                  return (
                    <Row align="middle">
                      <Col span={12} align="left">
                        {row.details && <p>{`Details: ${row.details}`}</p>}
                      </Col>
                      <Col span={12} align="right">
                        {renderTag(row.concepts)}
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
              columns={columns}
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

const renderTag = (concepts) => {
  //Only render first 5 tags
  const slicedConcepts = concepts.slice(0, 5);
  const tags = [];
  for (let i = 0; i < slicedConcepts.length; i++) {
    tags.push(<Tag key={i}>{slicedConcepts[i]}</Tag>);
  }
  return <>{tags}</>;
};
