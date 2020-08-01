import React from "react";
import { Button, Row, Col } from "antd";
import { convertTimeAgo } from "../../../utilfunctions/timeAgo";
import EditSubmission from "../../buttons/EditSubmission";
import HideWotoButton from "../../buttons/HideWotoButton";

/**
 * @matthewsclar @jaidharosenblatt
 * Table for collaborating with other students. Uses a current question passed
 * down form the Help page and GETs table data based on the course id
 *
 * Imports columns, header, and sorting from within this folder
 *
 * @param {props} queueTime expected wait time null if not currently in queue
 * @param {props} active whether there is active office hours for this course
 * @param {props} course course object containing code, id, and questionTemplate
 * @param {props} question user submitted question from Help parent component
 * @param {props} setQuestion modify state variable "question"
 * @param {props} setStage change the stage of the help process.
 * @param {props} joinDiscussionCallBack callback to render GroupInteraction component
 * @param {props} taPage if being created in ta page

 */

//Column Setup
export function createColumns(
  currentQuestion,
  getColumnSearchProps,
  handleEdit,
  handleArchive,
  joinDiscussions,
  questionTemplate,
  n,
  isSessionTable,
  helpStudent
) {
  var ret = [];
  var temp;
  //If questionTemplate is not available, return the default Woto Table Columns
  if (questionTemplate === undefined) {
    //If this is the SessionTable we are going to return the Default Session Columns
    if (isSessionTable) {
      ret = [
        {
          title: "Name",
          key: "name",
          dataIndex: "name",
          fixed: "left",
          width: 50,
        },
        {
          title: "Submitted",
          dataIndex: "createdAt",
          key: "createdAt",
          align: "center",
          width: 40,
          //responsive: ['sm'],
        },
        {
          title: "Assignment",
          dataIndex: "assignment",
          key: "assignment",
          width: 40,
          //responsive: ['sm'],
        },
        {
          title: "Stage",
          dataIndex: "stage",
          key: "stage",
          width: 80,
        },
        {
          dataIndex: "meetingURL",
          key: "meetingURL",
          align: "right",
          width: 50,
          render: (meetingURL, row) => (
            <Button
              type="primary"
              onClick={() => helpStudent(row)}
              href={meetingURL}
              target="_blank"
            >
              Help
            </Button>
          ),
        },
      ];
    } else {
      ret = [
        {
          title: "Group Lead",
          dataIndex: "name",
          key: "name",
          width: 90,
          ...getColumnSearchProps("name"),
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
          sorter: (a, b) => a.size - b.size,
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
          ...getColumnSearchProps("assignment"),

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
          ...getColumnSearchProps("stage"),
          render: (stage, row) => {
            if (
              currentQuestion &&
              stage === currentQuestion.stage &&
              !row.isYou
            ) {
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
                      questionTemplate={questionTemplate}
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
    }
  }
  //If questionTemplate does exist we will customize the columns
  else {
    //If this is the SessionTable then customize the TA columns
    if (isSessionTable) {
      ret = [
        {
          title: "Name",
          key: "name",
          dataIndex: "name",
          fixed: "left",
          width: 50,
        },
        {
          title: "Submitted",
          dataIndex: "createdAt",
          key: "createdAt",
          align: "center",
          width: 40,
          //responsive: ['sm'],
        },
      ];
      questionTemplate.forEach((item, i) => {
        if (item.showInTable && i < n) {
          temp = {
            title: item.label,
            dataIndex: item.label.toLowerCase(),
            key: item.label.toLowerCase(),
            width: 80,
            align: "left",
          };
          ret.push(temp);
          temp = {};
        }
      });

      ret.push({
        dataIndex: "meetingURL",
        key: "meetingURL",
        align: "right",
        width: 50,
        render: (meetingURL) => (
          <Button type="primary" href={meetingURL} target="_blank">
            Help
          </Button>
        ),
      });
    } else {
      //else create custom columns for the Collab Table
      ret = [
        {
          title: "Group Lead",
          dataIndex: "name",
          key: "name",
          width: 90,
          ...getColumnSearchProps("name"),
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
          defaultSortOrder: "descend",
          sorter: (a, b) => a.size - b.size,
          render: (size) => {
            if (size === 1) {
              return <>{`${size} student`}</>;
            } else {
              return <>{`${size} students`}</>;
            }
          },
        },
      ];

      questionTemplate.forEach((item, i) => {
        if (item.showInTable && i < n) {
          temp = {
            title: item.label,
            dataIndex: item.label.toLowerCase(),
            key: item.label.toLowerCase(),
            width: 80,
            align: "left",
            ...getColumnSearchProps(item.label.toLowerCase()),
          };
          ret.push(temp);
          temp = {};
        }
      });
      ret.push({
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
                    questionTemplate={questionTemplate}
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
      });
    }
  }

  return ret;
}
