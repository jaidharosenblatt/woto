import React, { useContext, useState, useEffect } from "react";
import { Card, Row, Col, Space } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../contexts/AuthContext";
import { HelpContext } from "../../../pages/studenthelp/util/HelpContext";
import functions from "../../../pages/studenthelp/util/functions";
import { getCollabData } from "./getCollabData";
import SearchTable from "./SearchTable";
import { seperateFields } from "./expandRow";

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
const WotoRoomsStudent = (props) => {
  const authContext = useContext(AuthContext);
  const { state, dispatch } = useContext(HelpContext);
  const { requiredFields } = seperateFields(state.course?.sessionAttributes);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const res = await getCollabData(state.course, authContext, requiredFields);
    setLoading(false);
    setData([...res]);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.discussion]);

  const joinDiscussion = (value) => {
    if (!props.taPage) {
      functions.joinDiscussion(state, dispatch, value, authContext.state);
    }
  };

  const colParams = { state, joinDiscussion };

  return (
    <Card
      title={
        <Row align="middle" gutter={[8, 8]}>
          <Col xs={24} md={props.questionNotArchived ? 24 : 18}>
            <Space direction="vertical">
              <h2>
                {state.course.code}'s Woto Rooms{" "}
                {loading ? (
                  <LoadingOutlined />
                ) : (
                  <ReloadOutlined onClick={loadData} />
                )}
              </h2>
            </Space>
          </Col>
        </Row>
      }
    >
      <SearchTable
        data={data}
        course={state.course}
        loading={loading}
        colParams={colParams}
      />
    </Card>
  );
};

export default WotoRoomsStudent;
