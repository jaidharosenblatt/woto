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
        createdAt: new Date() - 200000,
        stage: "Just Started",
        assignment: "hw1",
        concepts: ["Static Data"],
      },
      {
        key: 1,
        name: "Sobel Kyle",
        id: 1,
        createdAt: new Date() - 500000,
        stage: "Just Started",
        assignment: "hw2",
        concepts: ["Static Data"],
      },
    ];
    setTimeout(() => setLoading(false), 500);
    setData([...fake]);
  };

  const helpStudent = (student) => {
    console.log(student);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <h2>
        Help Students{" "}
        {loading ? <LoadingOutlined /> : <ReloadOutlined onClick={loadData} />}
      </h2>

      <SearchTable
        colParams={{ help: true, helpStudent }}
        data={data}
        course={course}
        loading={loading}
      />
    </Space>
  );
};

export default HelpStudents;
