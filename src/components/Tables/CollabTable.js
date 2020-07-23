import React, { useContext, useState, useEffect } from "react";
import { Tag, Button } from "antd";
import { Card, Row, Col, Table, Switch, Space } from "antd";
import "./tables.css";
import API from "../../api/API";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { AuthContext } from "../../contexts/AuthContext";
import EditSubmission from "../buttons/EditSubmission";
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
  const { state } = useContext(AuthContext);
  const [showMe, setShowMe] = useState(true);
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [disableSwitch, setDisableSwitch] = useState(false);

  const handleEditQuestion = (values) => {
    props.setQuestion(values);
  };

  const joinDiscussions = async (value) => {
    try {
      const response = await API.joinDiscussion(value.id);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  //Add and remove yourself
  useEffect(() => {
    if (showMe && props.question && Object.keys(props.question).length !== 0) {
      setData([
        {
          key: "you",
          size: 1,
          firstname: `${state.user.name} (You)`,
          ...props.question,
        },
        ...initialData,
      ]);
    } else {
      setData(initialData);
    }
  }, [props.question, showMe, state.user.name, initialData]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await API.getWotoData(props.course._id);
        console.log(response);
        var formattedData = [];
        response.forEach((question, count) => {
          var temp = {
            key: count,
            firstname: "Kaden",
            lastname: "Rosenblatt",
            assignment: question.description.assignment,
            size: question.description.size,
            concepts: question.description.concepts,
            stage: question.description.stage,
            meetingUrl: question.description.zoomlink,
            details: question.description.details,
            id: question._id,
          };
          formattedData.push(temp);
        });
      } catch (error) {
        console.error(error);
      }
      setData(formattedData);
      setInitialData(formattedData);
    };
    loadData();
  }, [props.course._id]);

  //Collumn Setup
  const columns = [
    {
      title: "Group Lead",
      dataIndex: "firstname",
      key: "firstname",
      width: 70,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 50,
      align: "center",
      render: (size) => <>{`${size}/3`}</>,
    },
    {
      title: "Assignment",
      dataIndex: "assignment",
      key: "assignment",
      width: 80,
      align: "left",
      render: (assignments) => {
        if (Array.isArray(assignments)) {
          return <>{assignments[0]}</>;
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
    },
    {
      dataIndex: "meetingUrl",
      key: "meetingUrl",
      align: "right",
      width: 180,
      render: (meetingUrl, row) => {
        if (row.key === "you") {
          return (
            <EditSubmission
              handleEdit={handleEditQuestion}
              question={props.question}
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
    <div className="collab-table">
      <Row align="center">
        <Col span={24}>
          <Card
            title={
              <Row align="middle">
                <Col xs={14} md={18}>
                  <Space direction="vertical">
                    <h2>Work Together</h2>
                    <p>
                      {props.queueTime
                        ? `You still have ${props.queueTime} minutes until a TA can see you. Try working with your classmates while you wait!`
                        : "Open room for you to collaborate with peers"}
                    </p>
                  </Space>
                </Col>
                <Col xs={10} md={6} align="right">
                  <Space>
                    <p className="hide-mobile">Include Me</p>
                    <Switch
                      disabled={disableSwitch}
                      checked={showMe}
                      onChange={() => {
                        setDisableSwitch(true);
                        setTimeout(() => {
                          setDisableSwitch(false);
                        }, 1500);
                        setShowMe(!showMe);
                      }}
                    />
                  </Space>
                </Col>
              </Row>
            }
          >
            <Table
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
              rowClassName={(record) => record.key === "you" && "first-row"}
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
