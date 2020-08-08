import React from "react";
import { Button, Space, Tag } from "antd";
import { convertTimeAgo } from "../../../utilfunctions/timeAgo";
import { defaultFields } from "../../helpform/defaultFields";
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
  currentQuestion,
  getColumnSearchProps,
  joinDiscussion,
  questionTemplate,
  n,
  help
) {
  var ret = [];
  var temp;
  const highlightedValues = ["hw2", "NA"];

  if (!questionTemplate) {
    questionTemplate = defaultFields;
  }
  ret = [
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
    ret.push({
      title: "Submitted",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: 40,
    });
  } else {
    ret.push(
      {
        title: "Last Active",
        dataIndex: "lastActive",
        key: "lastActive",
        width: 90,
        align: "left",
        sorter: (a, b) => a.lastActive - b.lastActive,
        defaultSortOrder: "descend",
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
      }
    );
  }

  questionTemplate.forEach((item, i) => {
    if (item.showInTable && i < n) {
      temp = {
        title: item.label,
        dataIndex: item.label.toLowerCase(),
        key: item.label.toLowerCase(),
        align: "left",
        ...getColumnSearchProps(item.label.toLowerCase()),
        render: (item) => {
          if (Array.isArray(item)) {
            return (
              <>
                {item.map((option) => {
                  return (
                    <Tag
                      color={
                        highlightedValues.includes(option) ? "blue" : "default"
                      }
                    >
                      {option}
                    </Tag>
                  );
                })}
              </>
            );
          }
          if (highlightedValues.includes(item)) {
            return <p style={{ color: "#40A9FF" }}>{item}</p>;
          } else {
            return <>{item}</>;
          }
        },
      };
      ret.push(temp);
      temp = {};
    }
  });

  if (help) {
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
    ret.push({
      dataIndex: "meetingURL",
      key: "meetingURL",
      align: "right",
      width: 90,
      render: (meetingURL, row) => {
        if (row.isYou) {
          return null;
        }
        return (
          <Button
            block
            type="primary"
            onClick={() => joinDiscussion(row)}
            href={meetingURL}
            target="_blank"
          >
            Join Room
          </Button>
        );
      },
    });
  }

  return ret;
}
