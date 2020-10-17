import React, { useContext } from "react";
import { Col, Space, Card } from "antd";
import { Hourglass } from "../../../static/Images";
import OpenSessionForm from "./OpenSessionForm";
import { TAHelpContext } from "../util/TAHelpContext";
import functions from "../util/functions";
import { AuthContext } from "../../../contexts/AuthContext";

/**
 * Wrap open session form in a card with a header
 */
const OpenSession = () => {
  const { state, dispatch } = useContext(TAHelpContext);
  const auth = useContext(AuthContext);

  const openSession = async (values) => {
    functions.openSession(state, dispatch, auth, values);
  };
  return (
    <div className="open-session-form">
      <Card
        title={
          <div className="open-session-form-header">
            <Space size={24}>
              <img src={Hourglass} alt="Hourglass" />
              <div>
                <h1>Create a New Session</h1>
                <h3>{state.course?.code} Office Hours</h3>
              </div>
            </Space>
          </div>
        }
      >
        <Col span={24}>
          <OpenSessionForm onSubmit={openSession} />
        </Col>
      </Card>
    </div>
  );
};
export default OpenSession;
