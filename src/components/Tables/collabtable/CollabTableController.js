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
//import { renderItemsToTags } from "../../../utilfunctions/renderItemsToTags";
import { createColumns } from "./createColumns";
import CollabTableHeader from "./CollabTableHeader";
import "./collabtable.css";
import { GlobeImage } from "../../../static/LoadedImages";
import { defaultFields } from "../../helpform/defaultFields";

/**
 * @jaidharosenblatt
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
const CollabTable = (props) => {
  const { state } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(
    props.question && !props.question.archived
  );
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  var n = props.course.sessionAttribute ? props.course.sessionAttribute.n : 2;
  const [loading, setLoading] = useState(true);
  const currentQuestion = props.question && props.question.description;

  var searchInput;
  var detailFieldsCol1 = [];
  var requiredFields = [];
  var detailFieldsCol2 = [];
  var questionTemplate =
    props.course.sessionAttributes &&
    props.course.sessionAttributes.questionTemplate;

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

  // Load data on component mount
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Join a Woto and leave your previous one
   * @param {value} id of woto to join
   */
  const joinDiscussions = async (value) => {
    props.joinDiscussionCallBack && props.joinDiscussionCallBack(value);
    try {
      const response = await API.joinDiscussion(value.id);
      // Remove current current if it exists
      if (props.question && props.question._id) {
        handleEdit({ archived: true }, props.question._id);
        setActiveQuestion(false);
      }
      loadData();

      console.log(response);
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  /**
   * Update a Woto
   * @param {*} values fields to update
   * @param {*} id of current discussion
   */
  const handleEdit = async (values, id) => {
    const details = { description: values };
    const res = await API.editDiscussion(id, details);
    //Set current as question if it was not archived
    props.setQuestion(res);
    loadData();
  };

  /**
   * Archive a Woto
   * @param {*} values fields to update
   * @param {*} id of current discussion
   */
  const handleArchive = async (id) => {
    setActiveQuestion(false);
    await API.editDiscussion(id, { archived: true });
    loadData();
  };

  /**
   * Submit a new Woto
   * @param {*} values fields from new Woto
   */
  const handleSubmit = async (values) => {
    await props.askQuestion(values);
    loadData();
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await API.getWotoData(props.course._id);
      var formattedData = [];
      console.log(response);
      response.forEach((question, count) => {
        if (!question.archived) {
          const isYou = question.owner._id === state.user._id;
          if (isYou) {
            setActiveQuestion(true);
            props.setDescription(question);
          }
          const name = isYou
            ? `${question.owner.name.split(" ")[0]} (you)`
            : question.owner.name.split(" ")[0];

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
        emptyText: (
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
                    if (field.label) {
                      return (
                        <p key={field.label}>{`${field.label}: ${
                          row[field.label.toLowerCase()]
                        }`}</p>
                      );
                    }
                    return <></>;
                  })}
                </Space>
              </Col>
              <Col span={12} align="right">
                <Space direction="vertical">
                  {detailFieldsCol2.map((field) => {
                    if (field.label) {
                      return (
                        <p key={field.label}>{`${field.label}: ${
                          row[field.label.toLowerCase()]
                        }`}</p>
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
        currentQuestion,
        getColumnSearchProps,
        handleEdit,
        handleArchive,
        joinDiscussions,
        props.course.sessionAttributes &&
          props.course.sessionAttributes.questionTemplate,
        n,
        false
      )}
      dataSource={data}
      scroll={{ x: 650 }}
      rowClassName={(record) => record.isYou && "first-row"}
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
                  questionNotArchived={activeQuestion}
                  courseCode={props.course.code}
                  loading={loading}
                  loadData={loadData}
                  queueTime={props.queueTime}
                  currentQuestion={currentQuestion}
                  handleSubmit={handleSubmit}
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
