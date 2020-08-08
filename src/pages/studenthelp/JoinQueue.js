import React, { useContext } from "react";
import { Row, Col, Space, Button, Card } from "antd";
import { PresentationImage } from "../../static/LoadedImages";
import { HelpContext } from "./util/HelpContext";
import functions from "./util/functions";

import "./Help.css";
import NavBarCentered from "../../components/centeredpage/NavBarCentered";
import { convertDateString } from "../../utilfunctions/timeAgo";

const JoinQueue = () => {
  const { state, dispatch } = useContext(HelpContext);
  return (
    <NavBarCentered>
      <Row className="join-queue" align="middle">
        <Col xs={24}>
          <Card>
            <div className="card-details">
              <PresentationImage className="hero" />
              <Space direction="vertical">
                <h1>
                  Office Hours{" "}
                  {state.session &&
                    state.session.endTime &&
                    `Until ${convertDateString(state.session.endTime)}`}
                </h1>
                <p>Reserve your spot to work with a TA</p>
                <Button
                  size="large"
                  type="primary"
                  block
                  onClick={() => functions.joinQueue(state, dispatch)}
                >{`Join ${state.course &&
                  state.course.code}'s Queue As #2`}</Button>
                <h3>
                  If you don't want help from a TA and just want to go to the
                  Woto Room click{" "}
                  <b onClick={() => functions.joinWotoRoom(state, dispatch)}>
                    here
                  </b>
                </h3>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </NavBarCentered>
  );
};

export default JoinQueue;
