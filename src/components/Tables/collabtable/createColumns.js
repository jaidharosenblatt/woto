import React from "react";
import { Button } from "antd";
import { convertTimeAgo } from "../../../utilfunctions/timeAgo";
import EditSubmission from "../../buttons/EditSubmission";

//Collumn Setup
export const createColumns = (
  currentQuestion,
  handleEdit,
  joinDiscussions,
  maxSize
) => [
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
            archive
            videoRoom
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
