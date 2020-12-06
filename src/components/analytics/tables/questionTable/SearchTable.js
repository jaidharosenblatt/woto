import React, { useState } from "react";
import { Table, Space, Input, Button } from "antd";
import Highlighter from "react-highlight-words";

import { SearchOutlined } from "@ant-design/icons";
import { createColumns } from "./createColumns";
import CollabEmptyState from "./CollabEmptyState";
import HelpEmptyState from "./HelpEmptyState";

import { seperateFields } from "./expandRow";

import "./collabtable.css";
import { connect } from "react-redux";
import selectors from "../../../../redux/selectors";
import { joinDiscussion } from "../../../../redux/courses/actions/wotos";
import { helpStudent } from "../../../../redux/courses/actions/ta";

/**
 * Create a table using createColumns and add the ability to search and expand
 * @param {Array} colParams the parameters to add to createColumns
 * @param {Array} data source of rows
 * @param {Boolean} help whether or not table is being used to help students
 */
const SearchTable = (props) => {
  const { displayCutoff, expand, questionTemplate } = seperateFields(
    props.course
  );

  // Code copied from antd docs
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
  // End of search
  const columns = createColumns(
    props.activeDiscussion,
    props.activeQuestion,
    props.userID,
    questionTemplate,
    getColumnSearchProps,
    props.joinDiscussion,
    props.helpStudent,
    displayCutoff,
    props.help
  );

  return (
    <Table
      className="collab-table"
      loading={props.loading}
      locale={{
        emptyText:
          props.data.length === 0 &&
          (props.help ? <HelpEmptyState /> : <CollabEmptyState />),
      }}
      expandable={expand}
      columns={columns}
      dataSource={props.data}
      scroll={{ x: 650 }}
    />
  );
};

const mapStateToProps = (state, pastProps) => {
  return {
    ...pastProps,
    activeDiscussion: selectors.getActiveDiscussion(state),
    activeQuestion: selectors.getActiveQuestion(state),
    loading: selectors.getLoading(state),
    userID: selectors.getUserID(state),
  };
};

export default connect(mapStateToProps, { joinDiscussion, helpStudent })(
  SearchTable
);
