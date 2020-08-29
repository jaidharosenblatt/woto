import React, { useState } from "react";
import { Table, Space, Input, Button } from "antd";
import Highlighter from "react-highlight-words";

import { SearchOutlined } from "@ant-design/icons";
import { createColumns } from "./createColumns";
import CollabEmptyState from "./CollabEmptyState";
import HelpEmptyState from "./HelpEmptyState";

import { seperateFields } from "./expandRow";

import "./collabtable.css";

/**
 * Create a table using createColumns and add the ability to search and expand
 * @param colParams the parameters to add to createColumns
 * @param data source of rows
 * @param course active course
 * @param loading loading state from parent
 */
const SearchTable = ({ colParams, data = [], course, loading, help }) => {
  const { displayCutoff, expand, questionTemplate } = seperateFields(course);

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

  return (
    <Table
      className="collab-table"
      loading={loading}
      locale={{
        emptyText:
          data.length === 0 &&
          (help ? <HelpEmptyState /> : <CollabEmptyState />),
      }}
      expandable={expand}
      columns={createColumns({
        ...colParams,
        displayCutoff,
        questionTemplate,
        getColumnSearchProps,
      })}
      dataSource={data}
      scroll={{ x: 650 }}
    />
  );
};

export default SearchTable;
