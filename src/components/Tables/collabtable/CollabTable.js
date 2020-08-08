import React, { useContext, useState, useEffect } from "react";
import { Card, Row, Col, Table, Space, Input, Button } from "antd";
import Highlighter from "react-highlight-words";
import {
  DownOutlined,
  UpOutlined,
  SearchOutlined,
  LoadingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import API from "../../../api/API";
import { AuthContext } from "../../../contexts/AuthContext";
import { HelpContext } from "../../../pages/studenthelp/util/HelpContext";
import { createColumns } from "./createColumns";
import CollabTableHeader from "./CollabTableHeader";
import "./collabtable.css";
import { GlobeImage } from "../../../static/LoadedImages";
import { defaultFields } from "../../helpform/defaultFields";
import functions from "../../../pages/studenthelp/util/functions";

/**
 * @jaidharosenblatt
 * Table for collaborating with other students. Uses a current question passed
 * down form the Help page and GETs table data based on the course id
 *
 * Imports columns, header, and sorting from within this folder
 *
 * @param {props} queueTime expected wait time null if not currently in queue
 * @param {props} loading if page is loading
 * @param {props} taPage if being created in ta page

 */
const CollabTable = (props) => {
  const authContext = useContext(AuthContext);
  const { state, dispatch } = useContext(HelpContext);

  const [data, setData] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  var n = state.course.sessionAttribute ? state.course.sessionAttribute.n : 2;
  const [loading, setLoading] = useState(true);

  var searchInput;
  var detailFieldsCol1 = [];
  var requiredFields = [];
  var detailFieldsCol2 = [];
  var questionTemplate = state.course.sessionAttributes?.questionTemplate;

  if (questionTemplate === undefined) {
    questionTemplate = defaultFields;
  }
  for (var i = 0; i < questionTemplate.length; i++) {
    if (questionTemplate[i].required) {
      requiredFields.push(questionTemplate[i]);
    }
    if (i >= n) {
      if (i % 2 === 0) {
        detailFieldsCol1.push(questionTemplate[i]);
      } else {
        detailFieldsCol2.push(questionTemplate[i]);
      }
    }
  }

  const joinDiscussion = (value) => {
    functions.joinDiscussion(state, dispatch, value, authContext.state);
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.discussion]);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchedColumn(dataIndex);
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await API.getWotoData(state.course._id);
      var formattedData = [];
      console.log(response);
      response.forEach((question, count) => {
        if (!question.archived) {
          const myId = authContext.state.user._id;
          const isYou = question.owner._id === myId;

          // const inParticipants =
          //   question.participants.filter((item) => item.participant === myId)
          //     .length > 0;

          var name = isYou
            ? `${question.owner.name.split(" ")[0]}'s Room (you)`
            : `${question.owner.name.split(" ")[0]}'s Room`;

          if (question.description.roomName) {
            name = question.description.roomName;
          }

          //CHECK FOR OLD DATA, FIELDS COULD BE CHANGED

          var bool = true;
          for (var i = 0; i < requiredFields.length; i++) {
            if (
              Object.keys(question.description).includes(
                requiredFields[i].label.toLowerCase()
              )
            ) {
              continue;
            } else {
              bool = false;
              break;
            }
          }
          if (bool) {
            var temp = {
              key: count,
              name: name,
              id: question._id,
              isYou: isYou,
              lastActive: new Date(question.updatedAt),
              size: question.participants.length,
              participants: question.participants,

              description: question.description,
              ...question.description,
            };

            formattedData.push(temp);
          }
        }
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    setData(formattedData);
  };

  const table = (
    <Table
      className="collab-table"
      loading={loading}
      locale={{
        emptyText: data.length === 0 && (
          <div className="empty-collab-table">
            <p>No one here. Be the first to create a Woto Room</p>
            <GlobeImage className="waiting-image" />
          </div>
        ),
      }}
      expandable={{
        expandedRowRender: (row) => {
          return (
            <Row align="middle">
              <Col span={12} align="left">
                <Space direction="vertical">
                  {detailFieldsCol1.map((field) => {
                    const value = row[field.label.toLowerCase()];
                    if (field.label && value) {
                      return (
                        <p key={field.label}>{`${field.label}: ${value}`}</p>
                      );
                    }
                    return <></>;
                  })}
                </Space>
              </Col>
              <Col span={12} align="right">
                <Space direction="vertical">
                  {detailFieldsCol2.map((field) => {
                    const value = row[field.label.toLowerCase()];

                    if (field.label && value) {
                      return (
                        <p key={field.label}>{`${field.label}: ${value}`}</p>
                      );
                    }
                    return <></>;
                  })}
                </Space>
              </Col>
            </Row>
          );
        },
        rowExpandable: (row) =>
          row.details !== undefined || row.concepts !== undefined,
        expandIcon: ({ expanded, onExpand, record }) =>
          expanded ? (
            <DownOutlined onClick={(e) => onExpand(record, e)} />
          ) : (
            <UpOutlined onClick={(e) => onExpand(record, e)} />
          ),
      }}
      columns={createColumns(
        state,
        getColumnSearchProps,
        joinDiscussion,
        n,
        false
      )}
      dataSource={data}
      scroll={{ x: 650 }}
    />
  );

  return (
    <div>
      <Row align="center">
        <Col span={24}>
          {props.taPage ? (
            <Space direction="vertical" style={{ width: "100%" }}>
              <h2>
                Woto Rooms{" "}
                {props.loading ? (
                  <LoadingOutlined />
                ) : (
                  <ReloadOutlined onClick={loadData} />
                )}
              </h2>

              {table}
            </Space>
          ) : (
            <Card
              title={
                <CollabTableHeader
                  description={state.description}
                  discussion={state.discussion}
                  courseCode={state.course.code}
                  loading={loading}
                  loadData={loadData}
                  queueTime={10}
                  questionTemplate={questionTemplate}
                />
              }
            >
              {table}
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CollabTable;
