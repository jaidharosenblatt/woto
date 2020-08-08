import React from "react";
import { Button } from "antd";
import { convertTimeAgo } from "../../../utilfunctions/timeAgo";
import { defaultFields } from "../../helpform/defaultFields";
import {
  getCommonValues,
  renderCommonItem,
} from "../../../utilfunctions/getCommonValues";
/**
 * @matthewsclar @jaidharosenblatt
 * Exported function that returns columns for either the Woto Table or the Session Table depending on
 * value of isSessionTable.
 *
 * @param {props} currentQuestion current submitted question by the User in the Woto Table
 * @param {props} getColumnSearchProps function used for search functionality in Woto Table
 * @param {props} handleEdit function that handles edits for woto discussions
 * @param {props} handleArchive function that handles archiving woto discussions
 * @param {props} joinDiscussions function used in CollabTable to join a discussion
 * @param {props} questionTemplate object that contains entire questionTemplate
 * @param {props} n integer customized by instructors which determines what fields go where in a row
 * @param {props} isSessionTable boolean that determines whether to return:
 *                                                            Woto Table Columns: False,
 *                                                            Session Table Columns: True
 * @param {props} helpStudent callback function to helpStudent called when TA's click "help"
 */

//Column Setup
export function createColumns(
  state,
  getColumnSearchProps,
  joinDiscussion,
  n,
  help
) {
  var cols = [];

  const questionTemplate = state?.questionTemplate || defaultFields;

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
      width: 40,
    });
  } else {
    cols.push(
      {
        title: "Last Active",
        dataIndex: "lastActive",
        key: "lastActive",
        width: 100,
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
        width: 90,
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
      render: (meetingURL) => (
        <Button block type="primary" href={meetingURL} target="_blank">
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
        if (state?.discussionParticipant) {
          return (
            <Button block disabled>
              Join Room
            </Button>
          );
        }
        return (
          <Button block type="primary" onClick={() => joinDiscussion(row)}>
            Join Room
          </Button>
        );
      },
    });
  }

  return cols;
}
