import React, { useContext, useState, useEffect } from "react";
import { Card, Row, Col, Table, Space, Input, Button } from "antd";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  LoadingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { AuthContext } from "../../../contexts/AuthContext";
import { HelpContext } from "../../../pages/studenthelp/util/HelpContext";
import { createColumns } from "./createColumns";
import CollabTableHeader from "./CollabTableHeader";
import "./collabtable.css";
import { defaultFields } from "../../helpform/defaultFields";
import functions from "../../../pages/studenthelp/util/functions";
import { getCollabData, seperateFields } from "./getCollabData";
import { expandRow } from "./expandRow";
import { collabEmptyState } from "./emptyState";
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
 * @param {props} course if TA page pass down the course
 */
const CollabTable = (props) => {
  const authContext = useContext(AuthContext);
  const context = useContext(HelpContext);

  // use state and dispatch if collab
  const state = context?.state;
  const dispatch = context?.dispatch;
  // otherwise if ta help use props
  const course = state ? state.course : props.course;

  const [data, setData] = useState([]);

  var n = course.sessionAttribute ? course.sessionAttribute.n : 2;
  const [loading, setLoading] = useState(true);

  const questionTemplate = course.sessionAttributes?.questionTemplate
    ? course.sessionAttributes?.questionTemplate
    : defaultFields;

  const fields = seperateFields(questionTemplate, n);
  const { requiredFields, detailFieldsCol1, detailFieldsCol2 } = fields;

  const joinDiscussion = (value) => {
    if (!props.taPage) {
      functions.joinDiscussion(state, dispatch, value, authContext.state);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.discussion]);

  var searchInput;
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
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
    const res = await getCollabData(course, authContext, requiredFields);
    setLoading(false);
    setData([...res]);
  };

  const table = (
    <Table
      className="collab-table"
      loading={loading}
      locale={{
        emptyText: data.length === 0 && collabEmptyState,
      }}
      expandable={expandRow(detailFieldsCol1, detailFieldsCol2)}
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
                  courseCode={course.code}
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
