import React, { useContext, useState, useEffect } from "react";
import { Card, Row, Col, Table, Space, Input, Button } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";

const WotoRoomsTA = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  var n = course.sessionAttribute ? course.sessionAttribute.n : 2;

  const fields = seperateFields(questionTemplate, n);
  const { requiredFields, detailFieldsCol1, detailFieldsCol2 } = fields;
  const questionTemplate = course.sessionAttributes?.questionTemplate
    ? course.sessionAttributes?.questionTemplate
    : defaultFields;

  const loadData = async () => {
    setLoading(true);
    const res = await getCollabData(course, authContext, requiredFields);
    setLoading(false);
    setData([...res]);
  };

  return (
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
  );
};

export default WotoRoomsTA;
