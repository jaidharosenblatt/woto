import React, { useState, useEffect } from "react";
import { Space } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import SearchTable from "./SearchTable";

const HelpStudents = ({ course }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setLoading(true);
    const fake = [
      {
        key: 1,
        name: "Kyle Sobel",
        id: 1,
        createdAt: new Date(),
        size: 3,
        stage: "Static Data",
        assignment: "Static Data",
        concepts: ["Static Data"],
      },
    ];
    setTimeout(() => setLoading(false), 500);
    setData([...fake]);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <h2>
        Help Students{" "}
        {loading ? <LoadingOutlined /> : <ReloadOutlined onClick={loadData} />}
      </h2>

      <SearchTable
        colParams={{ help: true }}
        data={data}
        course={course}
        loading={loading}
      />
    </Space>
  );
};

export default HelpStudents;
