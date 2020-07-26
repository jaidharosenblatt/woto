import React, { useContext, useState, useEffect } from "react";
import { Card, Row, Col, Table, Space, Tag, Button } from "antd";
import {
  DownOutlined,
  UpOutlined,
  ReloadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { convertTimeAgo } from "../../../utilfunctions/timeAgo";
import "./collabtable.css";
import API from "../../../api/API";
import { AuthContext } from "../../../contexts/AuthContext";
import AddWotoButton from "../../buttons/AddWotoButton";
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
  const maxSize = 3;
  const { state } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const currentQuestion = props.question && props.question.details;
  const questionNotArchived = props.question && !props.question.archived;

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

  const handleEdit = async (values, id) => {
    const res = await API.editDiscussion(id, values);
    //Set current as question if it was not archived
    props.setQuestion(res);
    loadData();
  };

  const handleSubmit = (values) => {
    props.askQuestion(values);
    loadData();
  };

  // Sort data
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

      // Sort by date if no question
      if (!currentQuestion) {
        return a.createdAt - b.createdAt;
      }

      //Check if one of the submissions matches assignment and other doesn't
      if (
        a.assignment[0] === currentQuestion.assignment[0] &&
        b.assignment[0] !== currentQuestion.assignment[0]
      ) {
        return -1;
      }
      if (
        b.assignment[0] === currentQuestion.assignment[0] &&
        a.assignment[0] !== currentQuestion.assignment[0]
      ) {
        return 1;
      }
      //Check if one of the submissions matches stage and other doesn't
      if (
        a.stage === currentQuestion.stage &&
        b.stage !== currentQuestion.stage
      ) {
        return -1;
      }
      if (
        b.stage === currentQuestion.stage &&
        a.stage !== currentQuestion.stage
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
  }, [props.course._id, state.user.name, currentQuestion]);

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
      width: 90,
      align: "left",
      render: (createdAt) => {
        return <>{convertTimeAgo(createdAt)}</>;
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
      render: (assignments, row) => {
        if (Array.isArray(assignments)) {
          if (
            currentQuestion &&
            currentQuestion.assignment &&
            assignments[0] === currentQuestion.assignment[0] &&
            !row.isYou
          ) {
            return <p className="match">{assignments[0]}</p>;
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
      render: (stage, row) => {
        if (currentQuestion && stage === currentQuestion.stage && !row.isYou) {
          return <p className="match">{stage}</p>;
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
              handleSubmit={(values) => handleEdit(values, row.id)}
              question={row.description}
            />
          );
        }
        return (
          <Button
            block
            disabled={row.size >= maxSize}
            type="primary"
            onClick={() => joinDiscussions(row)}
            href={meetingUrl}
            target="_blank"
          >
            {row.size >= maxSize ? "Room is Full" : "Join Room"}
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
              <Row align="middle" gutter={[8, 8]}>
                <Col xs={24} md={questionNotArchived ? 24 : 18}>
                  <Space direction="vertical">
                    <h2>
                      Woto Room{" "}
                      {loading ? (
                        <LoadingOutlined />
                      ) : (
                        <ReloadOutlined onClick={loadData} />
                      )}
                    </h2>
                    <p>
                      {props.queueTime
                        ? `You still have ${props.queueTime} minutes until a TA can see you. Try working with your classmates while you wait!`
                        : "An open room for you to work together with your peers"}
                    </p>
                  </Space>
                </Col>

                <Col xs={0} md={questionNotArchived ? 0 : 6} align="right">
                  <AddWotoButton
                    question={currentQuestion}
                    handleSubmit={handleSubmit}
                    CTA={`Join ${props.course.code}'s Woto Room`}
                  />
                </Col>
                <Col xs={questionNotArchived ? 0 : 24} md={0} align="left">
                  <AddWotoButton
                    question={currentQuestion}
                    handleSubmit={handleSubmit}
                    CTA={`Join ${props.course.code}'s Woto Room`}
                  />
                </Col>
              </Row>
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
