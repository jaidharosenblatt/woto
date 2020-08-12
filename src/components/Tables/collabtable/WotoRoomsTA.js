import React, { useContext, useState, useEffect } from "react";
import { Space } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../contexts/AuthContext";
import { convertDiscussionsToColumns } from "./getCollabData";
import SearchTable from "./SearchTable";
import { seperateFields } from "./expandRow";
import AddWotoButton from "../../buttons/AddWotoButton";
import LeftRightRow from "../../leftrightrow/LeftRightRow";
import API from "../../../api/API";

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
    const res = await API.getWotoData(props.course._id);
    const filtered = convertDiscussionsToColumns(
      res,
      authContext,
      requiredFields
    );
    setLoading(false);
    setData([...filtered]);
  };

  const postDiscussion = (values) => {
    try {
      API.askWotoQuestion(props.course._id, values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <LeftRightRow
        left={
          <h2>
            {props.course.code}'s Woto Rooms{" "}
            {loading ? (
              <LoadingOutlined />
            ) : (
              <ReloadOutlined onClick={loadData} />
            )}
          </h2>
        }
        right={
          <AddWotoButton
            videoRoom
            questionTemplate={props.course.questionTemplate}
            handleSubmit={postDiscussion}
          />
        }
      />

      <SearchTable data={data} course={props.course} loading={loading} />
    </Space>
  );
};

export default WotoRoomsTA;
