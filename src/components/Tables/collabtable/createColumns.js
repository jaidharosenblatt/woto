import React from "react";
import { Button, Row, Col } from "antd";
import { convertTimeAgo } from "../../../utilfunctions/timeAgo";
import EditSubmission from "../../buttons/EditSubmission";
import HideWotoButton from "../../buttons/HideWotoButton";

//Collumn Setup
export const createColumns = (
  currentQuestion,
  handleEdit,
  handleArchive,
  joinDiscussions
) => [
  {
    title: "Group Lead",
    dataIndex: "name",
    key: "name",
    width: 90,
  },
  {
    title: "Last Active",
    dataIndex: "lastActive",
    key: "lastActive",
    width: 90,
    align: "left",
    render: (lastActive) => {
      return <>{convertTimeAgo(lastActive)}</>;
    },
  },
  {
    title: "Group Size",
    dataIndex: "size",
    key: "size",
    width: 80,
    align: "left",
    render: (size) => {
      if (size === 1) {
        return <>{`${size} student`}</>;
      } else {
        return <>{`${size} students`}</>;
      }
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
    dataIndex: "meetingURL",
    key: "meetingURL",
    align: "right",
    width: 180,
    render: (meetingURL, row) => {
      if (row.isYou) {
        return (
          <Row gutter={4}>
            <Col span={12}>
              <EditSubmission
                videoRoom
                handleSubmit={(values) => handleEdit(values, row.id)}
                question={row.description}
              />
            </Col>
            <Col span={12}>
              <HideWotoButton handleLeave={() => handleArchive(row.id)} />
            </Col>
          </Row>
        );
      }
      return (
        <Button
          block
          type="primary"
          onClick={() => joinDiscussions(row)}
          href={meetingURL}
          target="_blank"
        >
          Join Room
        </Button>
      );
    },
  },
];
