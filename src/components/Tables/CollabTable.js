import React from "react";
import { Tag, Button } from "antd";
import { Card, Row, Col, Table, Switch, Space } from "antd";
import "./tables.css";
import { AuthContext } from "../../contexts/AuthContext";
/**
 * @tommytilton @jaidharosenblatt
 * Render a collab table based on static data + a new question
 * @param {props} question the user's question
 * @param {props} queueTime expected wait time
 */
const CollabTable = (props) => {
  const { state } = React.useContext(AuthContext);
  const [showMe, setShowMe] = React.useState(true);
  const [data, setData] = React.useState(initialData);

  React.useEffect(() => {
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
                expandedRowRender: (row) => <p>{row.details}</p>,
                rowExpandable: (row) => row.details !== undefined,
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
  //Only render first 3 tags
  const slicedConcepts = concepts.slice(0, 3);
  const tags = [];
  for (let i = 0; i < slicedConcepts.length; i++) {
    tags.push(<Tag key={i}>{slicedConcepts[i]}</Tag>);
  }
  return <>{tags}</>;
};

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
    title: "Concepts",
    dataIndex: "concepts",
    key: "concepts",
    width: 100,
    align: "left",
    render: (concepts) => renderTag(concepts),
  },
  {
    title: "Stage",
    dataIndex: "stage",
    key: "stage",
    render: (stage) => <>{createTag(stage)}</>,
    width: 100,
  },
  {
    title: "Zoom Room",
    dataIndex: "meetingUrl",
    key: "meetingUrl",
    fixed: "center",
    width: 50,
    render: (meetingUrl, row) => {
      if (row.key === "you") {
        return <Button type="primary">Edit</Button>;
      }
      return (
        <Button type="primary" href={meetingUrl} target="_blank">
          Join
        </Button>
      );
    },
  },
];

//Student info setup
const initialData = [
  {
    key: "1",
    firstname: "Noah",
    lastname: "Karpel",
    size: "3",
    assignment: "APT4",
    concepts: ["Arrays", "Linked List", "Merge Sort", "Quick Sort"],
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
