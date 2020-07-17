import React, { useContext, useState, useEffect } from "react";
import { Tag, Button } from "antd";
import { Card, Row, Col, Table, Switch, Space } from "antd";
import "./tables.css";
import API from "../../api/API"; 
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

  const handleEditQuestion = (values) => {
    props.setQuestion(values);
  };

  const joinDiscussions = async (value) => {
    try{
      const response = await API.joinDiscussion(value.id);
      console.log(response);
    }catch(err){
      console.error(err);
    }
  }

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
    
    
    try{
      const response = await API.getWotoData(props.course._id);
      console.log(response);
      var formattedData = []
      response.forEach((question, count) => {
        var temp ={
          key: count,
          firstname: "Kaden",
          lastname: "Rosenblatt",
          assignment: question.description.assignment,
          size: question.description.size,
          concepts: question.description.concepts,
          stage: question.description.stage,
          meetingUrl: question.description.zoomlink,
          details: question.description.details,
          id: question._id
        }
        formattedData.push(temp);
      });
    } catch(error){
      console.error(error);
    }
    setData(formattedData);
    setInitialData(formattedData);
  }
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
      render: (stage) => <>{createTag(stage)}</>,
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
        console.log(row.id);
        return (
          <Button block type="primary" onClick={() => joinDiscussions(row)} href={meetingUrl} target="_blank">
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
  if (stage === "Just started the problem") {
    return <Tag color="green" key={stage}>{`${stage}`}</Tag>;
  } else if (stage === "Understand the problem but no solution") {
    return <Tag color="blue" key={stage}>{`${stage}`}</Tag>;
  } else if (stage === "Debugging a solution") {
  return <Tag color="gold" key={stage}>{`${stage}`}</Tag>;
} else if (stage === "Improving/checking a solution") {
  return <Tag color="purple" key={stage}>{`${stage}`}</Tag>;
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
// const initialData = [
//   {
//     key: "1",
//     firstname: "Noah",
//     lastname: "Karpel",
//     size: "3",
//     assignment: ["APT4"],
//     concepts: [
//       "Arrays",
//       "Arrays",
//       "Arrays",
//       "Linked List",
//       "Merge Sort",
//       "Quick Sort",
//     ],
//     stage: "Debugging Solution",
//     meetingUrl: "https://zoom.us/",
//     details: "Been stuck on this bug forever",
//   },
//   {
//     key: "2",
//     firstname: "Tommy",
//     lastname: "Tilton",
//     assignment: ["Assignment 3"],
//     size: "1",
//     concepts: ["Merge Sort"],
//     stage: "Just Started",
//     meetingUrl: "https://zoom.us/",
//   },
//   {
//     key: "3",
//     firstname: "Matthew",
//     lastname: "Sclar",
//     assignment: ["APT 2"],
//     size: "1",
//     concepts: ["Tree", "Linked List"],
//     stage: "Understand Question",
//     link: "https://zoom.us/",
//     details: "Have an approach but can't code it",
//   },
//   {
//     key: "4",
//     firstname: "Kaden",
//     lastname: "Rosenblatt",
//     assignment: ["Assignment 2"],
//     size: "3",
//     concepts: ["Arrays"],
//     stage: "Debugging Solution",
//     meetingUrl: "https://zoom.us/",
//     details: "Syntax error I think",
//   },
// ];
