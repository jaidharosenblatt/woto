import React, { useContext, useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../contexts/AuthContext";
import { HelpContext } from "../../../pages/studenthelp/util/HelpContext";
import functions from "../../../pages/studenthelp/util/functions";
import { getCollabData } from "./getCollabData";
import SearchTable from "./SearchTable";
import { seperateFields } from "./expandRow";
import AddWotoButton from "../../buttons/AddWotoButton";
/**
 * @jaidharosenblatt
 * Table for collaborating with other students. Uses a current question passed
 * down form the Help page and GETs table data based on the course id
 */
const WotoRoomsStudent = ({ addWotoButton }) => {
  const authContext = useContext(AuthContext);
  const { state, dispatch } = useContext(HelpContext);
  const { questionTemplate, requiredFields } = seperateFields(
    state.course?.sessionAttributes
  );

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const res = await getCollabData(state.course, authContext, requiredFields);
    setLoading(false);
    setData([...res]);
  };

  useEffect(() => {
    functions.findMyDiscussion(state, dispatch, authContext.state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.discussion]);

  const joinDiscussion = (value) => {
    functions.joinDiscussion(state, dispatch, value, authContext.state);
  };

  const colParams = { state, joinDiscussion };

  const title = (
    <h2>
      {state.course.code}'s Woto Rooms{" "}
      {loading ? <LoadingOutlined /> : <ReloadOutlined onClick={loadData} />}
    </h2>
  );
  return (
    <Card
      title={
        <>
          {addWotoButton && (!state.discussion || state.discussion.archived) ? (
            <Row align="middle" gutter={[8, 8]}>
              <Col xs={24} md={18}>
                {title}
              </Col>
              <Col xs={24} md={6} align="right">
                <AddWotoButton
                  videoRoom
                  questionTemplate={questionTemplate}
                  handleSubmit={(values) =>
                    functions.postDiscussion(state, dispatch, values)
                  }
                />
              </Col>
            </Row>
          ) : (
            title
          )}
        </>
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
