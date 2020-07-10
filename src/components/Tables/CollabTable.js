import React, { useContext, useState, useEffect } from "react";
import { Tag, Button } from "antd";
import { Card, Row, Col, Table, Switch, Space } from "antd";
import "./tables.css";
import { AuthContext } from "../../contexts/AuthContext";
import EditSubmission from "../buttons/EditSubmission";
/**
 * @tommytilton @jaidharosenblatt
 * Render a collab table based on static data + a new question
 * @param {props} question the user's question
 * @param {props} queueTime expected wait time
 */
const CollabTable = (props) => {
  const { state } = useContext(AuthContext);
  const [showMe, setShowMe] = useState(true);
  const [data, setData] = useState(initialData);

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
  }, [props.question, showMe, state.user.name]);

  //Collumn Setup
  const columns = [
    {
      title: "Group Lead",
      dataIndex: "firstname",

      key: "firstname",
      fixed: "left",
      width: 70,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 50,
      align: "center",
    },
    {
      title: "Assignment",
      dataIndex: "assignment",
      key: "assignment",
      width: 80,
      align: "left",
    },

    {
      title: "Stage",
      dataIndex: "stage",
      key: "stage",
      render: (stage) => <>{createTag(stage)}</>,
      width: 100,
    },
    {
      dataIndex: "meetingUrl",
      key: "meetingUrl",
      fixed: "right",
      align: "center",

      width: 130,
      render: (meetingUrl, row) => {
        if (row.key === "you") {
          return <EditSubmission question={props.question} />;
        }
        return (
          <Button block type="primary" href={meetingUrl} target="_blank">
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
                <Col md={20}>
                  <Space direction="vertical">
                    <h2>Collaborate with Peers</h2>
                    <p>
                      {`You still have ${props.queueTime} minutes until a TA can see you. Try working with your classmates while you wait!`}
                    </p>
                  </Space>
                </Col>
                <Col md={4} align="right">
                  <Space>
                    <p>Include Me</p>
                    <Switch
                      checked={showMe}
                      onChange={() => setShowMe(!showMe)}
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
              }}
              columns={columns}
              dataSource={data}
              scroll={{ x: 650 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CollabTable;

//Assign color to Stage tag
const createTag = (stage) => {
  if (stage === "Just Started") {
    return <Tag color="green" key={stage}>{`${stage}`}</Tag>;
  } else if (stage === "Debugging Solution") {
    return <Tag color="blue" key={stage}>{`${stage}`}</Tag>;
  } else {
    return <Tag color="volcano" key={stage}>{`${stage}`}</Tag>;
  }
};

const renderTag = (concepts) => {
  //Only render first 5 tags
  const slicedConcepts = concepts.slice(0, 5);
  const tags = [];
  for (let i = 0; i < slicedConcepts.length; i++) {
    tags.push(<Tag key={i}>{slicedConcepts[i]}</Tag>);
  }
  return <>{tags}</>;
};

//Student info setup
const initialData = [
  {
    key: "1",
    firstname: "Noah",
    lastname: "Karpel",
    size: "3",
    assignment: "APT4",
    concepts: [
      "Arrays",
      "Arrays",
      "Arrays",
      "Linked List",
      "Merge Sort",
      "Quick Sort",
    ],
    stage: "Debugging Solution",
    meetingUrl: "https://zoom.us/",
    details: "Been stuck on this bug forever",
  },
  {
    key: "2",
    firstname: "Tommy",
    lastname: "Tilton",
    assignment: "Assignment 3",
    size: "1",
    concepts: ["Merge Sort"],
    stage: "Just Started",
    meetingUrl: "https://zoom.us/",
  },
  {
    key: "3",
    firstname: "Matthew",
    lastname: "Sclar",
    assignment: "APT 2",
    size: "1",
    concepts: ["Tree", "Linked List"],
    stage: "Understand Question",
    link: "https://zoom.us/",
    details: "Have an approach but can't code it",
  },
  {
    key: "4",
    firstname: "Kaden",
    lastname: "Rosenblatt",
    assignment: "Assignment 2",
    size: "3",
    concepts: ["Arrays"],
    stage: "Debugging Solution",
    meetingUrl: "https://zoom.us/",
    details: "Syntax error I think",
  },
];
