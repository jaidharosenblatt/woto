import React, { useState, useEffect, useContext } from "react";
import { Space } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { getCollabData } from "./getCollabData";
import SearchTable from "./SearchTable";
import { seperateFields } from "./expandRow";
import { AuthContext } from "../../../contexts/AuthContext";

const WotoRoomsTA = (props) => {
  const authContext = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { requiredFields } = seperateFields(props.course?.sessionAttributes);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setLoading(true);
    const res = await getCollabData(props.course, authContext, requiredFields);
    setLoading(false);
    setData([...res]);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <h2>
        Woto Rooms{" "}
        {loading ? <LoadingOutlined /> : <ReloadOutlined onClick={loadData} />}
      </h2>

      <SearchTable data={data} course={props.course} loading={loading} />
    </Space>
  );
};

export default WotoRoomsTA;
