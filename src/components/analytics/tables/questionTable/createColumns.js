import React from "react";
import { Button, Tooltip } from "antd";
import util from "../../../../util";
import { defaultFields } from "../../../sessions/helpform/defaultFields";
import { renderCommonItem } from "../../../../util/getCommonValues";

/**
 * Render the columns needed for displaying questionTemplate data
 * This includes ta/instructor/student views for the Woto Rooms and the ta HelpStudents queue
 * @param {state} from help context
 * @param getColumnSearchProps makes col searchable
 * @param joinDiscussion callback for a student to join a discussion
 * @param n number of fields to render
 * @param help where or not this is called in a HelpStudents parent
 */
export function createColumns(
  activeDiscussion,
  activeQuestion,
  userID,
  questionTemplate,
  getColumnSearchProps,
  joinDiscussion,
  helpStudent,
  displayCutoff,
  help
) {
  var cols = [];

  if (!questionTemplate || questionTemplate.length === 0) {
    questionTemplate = defaultFields;
  }

  cols = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 110,
      ...getColumnSearchProps("name"),
    },
  ];

  // Push submitted at if helping or last active if collab
  if (help) {
    cols.push({
      title: "Joined Queue",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => a.createdAt - b.createdAt,
      width: 120,
      render: (lastActive) => {
        return <>{util.convertTimeAgo(lastActive)}</>;
      },
    });
  } else {
    cols.push(
      {
        title: "Last Active",
        dataIndex: "lastActive",
        key: "lastActive",
        width: 120,
        align: "left",
        sorter: (a, b) => a.lastActive - b.lastActive,
        render: (lastActive) => {
          return <>{util.convertTimeAgo(lastActive)}</>;
        },
      },
      {
        title: "Group Size",
        dataIndex: "size",
        key: "size",
        width: 120,
        align: "left",
        sorter: (a, b) => a.size - b.size,
        render: (size) => {
          if (size === 1) {
            return <>{`${size} student`}</>;
          } else {
            return <>{`${size} students`}</>;
          }
        },
      }
    );
  }

  questionTemplate.forEach((item, i) => {
    if (item.showInTable && i < displayCutoff) {
      cols.push({
        title: item.label,
        dataIndex: item.label.toLowerCase(),
        key: item.label.toLowerCase(),
        align: "left",
        ...getColumnSearchProps(item.label.toLowerCase()),
        render: (item, row) => {
          if (help) {
            if (Array.isArray(item)) {
              return <>{item.join(", ")}</>;
            } else if (!typeof Object) {
              return <>{item}</>;
            }
          }
          const highlightedValues = [];

          return renderCommonItem(item, highlightedValues);
        },
      });
    }
  });

  if (help) {
    cols.push({
      dataIndex: "meetingURL",
      key: "meetingURL",
      align: "right",
      width: 150,
      render: (url, row) => (
        <Button
          disabled={activeQuestion}
          block
          type={!row.assistant && "primary"}
          onClick={() => helpStudent(row)}
        >
          {row.assistant ? "Open Interaction" : "Help"}
        </Button>
      ),
    });
  } else {
    cols.push({
      dataIndex: "meetingURL",
      key: "meetingURL",
      align: "right",
      width: 100,
      render: (meetingURL, row) => {
        if (!activeDiscussion) {
          return (
            <Button
              block
              type="primary"
              onClick={() => joinDiscussion(row.discussion)}
              target="_blank"
            >
              Join Room
            </Button>
          );
        }
        if (row.discussion.owner._id === userID) {
          return (
            <Button block disabled>
              Your Room
            </Button>
          );
        }
        if (activeDiscussion) {
          return (
            <Tooltip title="You must leave your existing room">
              <Button block disabled>
                Join Room
              </Button>
            </Tooltip>
          );
        }
        return (
          <Button
            block
            type="primary"
            onClick={() => joinDiscussion(row.discussion)}
          >
            Join Room
          </Button>
        );
      },
    });
  }

  return cols;
}
