import React from "react";
import { Button, Space, Tag } from "antd";
import { convertTimeAgo } from "../../../utilfunctions/timeAgo";
import { defaultFields } from "../../helpform/defaultFields";
import { getCommonValues } from "../../../utilfunctions/getCommonValues";
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

  const questionTemplate = state.questionTemplate || defaultFields;

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
          const highlightedValues = getCommonValues(
            state.description,
            row.description
          );

          console.log("desc", state.description);
          console.log("item", row.description);
          console.log("highlightedValues", highlightedValues);

          if (Array.isArray(item)) {
            return (
              <>
                {item.map((option, i) => {
                  return (
                    <Tag
                      key={i}
                      color={
                        highlightedValues.includes(option) && !row.isYou
                          ? "blue"
                          : "default"
                      }
                    >
                      {option}
                    </Tag>
                  );
                })}
              </>
            );
          }
          if (highlightedValues.includes(item) && !row.isYou) {
            return <p style={{ color: "#40A9FF" }}>{item}</p>;
          } else {
            return <>{item}</>;
          }
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
        <Button type="primary" href={meetingURL} target="_blank">
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
        if (row.isYou) {
          return (
            <Button block disabled>
              Your Room
            </Button>
          );
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

  return cols;
}
