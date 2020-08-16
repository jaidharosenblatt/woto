import React, { useState, useEffect } from "react";
import { Space } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import SearchTable from "./SearchTable";
import API from "../../../api/API";
import { convertHelpData } from "./convertHelpData";

const HelpStudents = ({ session, course }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setLoading(true);
    const res = await API.getQuestions(session._id);
    console.log(res);
    const converted = convertHelpData(res);
    console.log(converted);

    setLoading(false);
    setData([...converted]);
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
        help
        colParams={{ help: true, helpStudent }}
        data={data}
        course={course}
        loading={loading}
      />
    </Space>
  );
};

export default HelpStudents;
