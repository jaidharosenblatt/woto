import React from "react";
import { Button, Tooltip } from "antd";
import { convertTimeAgo } from "../../../utilfunctions/timeAgo";
import { defaultFields } from "../../helpform/defaultFields";
import {
  getCommonValues,
  renderCommonItem,
} from "../../../utilfunctions/getCommonValues";

/**
 * Render the columns needed for displaying questionTemplate data
 * This includes ta/instructor/student views for the Woto Rooms and the ta HelpStudents queue
 * @param {state} from help context
 * @param getColumnSearchProps makes col searchable
 * @param joinDiscussion callback for a student to join a discussion
 * @param n number of fields to render
 * @param help where or not this is called in a HelpStudents parent
 */
export function createColumns({
  state,
  questionTemplate,
  getColumnSearchProps,
  joinDiscussion,
  helpStudent,
  n,
  help,
}) {
  var cols = [];

  if (!questionTemplate) {
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
      title: "Submitted",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      sorter: (a, b) => a.createdAt - b.createdAt,
      width: 120,
      render: (lastActive) => {
        return <>{convertTimeAgo(lastActive)}</>;
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
          return <>{convertTimeAgo(lastActive)}</>;
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
    if (item.showInTable && i < n) {
      cols.push({
        title: item.label,
        dataIndex: item.label.toLowerCase(),
        key: item.label.toLowerCase(),
        align: "left",
        ...getColumnSearchProps(item.label.toLowerCase()),
        render: (item, row) => {
          const highlightedValues =
            state && getCommonValues(state.description, row.description);

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
      width: 100,
      render: (url, row) => (
        <Button
          block
          type="primary"
          onClick={() => helpStudent(row.discussion)}
        >
          Help
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
        if (!state) {
          return (
            <Button block type="primary" href={meetingURL} target="_blank">
              Join Room
            </Button>
          );
        }
        if (row.isYou) {
          return (
            <Button block disabled>
              Your Room
            </Button>
          );
        }
        if (
          state?.discussionParticipant ||
          (state?.discussion && !state?.discussion?.archived)
        ) {
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
