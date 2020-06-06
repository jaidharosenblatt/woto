import React from "react";
import { Row, Col, Card } from "antd";
import "./Help.css";
import TitleHeader from "../../components/TitleHeader";
import LocationTimeTag from "../../components/icon-tags/LocationTimeTag";
import { HelpImage } from "../../static/Images";
import HelpForm from "./Form/HelpForm";
import TeachingStaff from "./TeachingStaff";

const HelpFormTitle = (
  <div>
    <h2>Ask a Question</h2>
    <p>If you have multiple questions, just ask one for now</p>
  </div>
);
/**
 * @jaidharosenblatt Page for students to recieve help for a given course
 */
const Help = () => {
  return (
    <div className="HelpPage">
      <Row align="center">
        <Col xs={20} lg={14}>
          <TitleHeader
            title="CS330 Office Hours"
            alt="Help"
            image={HelpImage}
            details={
              <LocationTimeTag location="Virtual" time="Now until 4pm" />
            }
          />
        </Col>
      </Row>
      <Row align="center">
        <Col xs={20} md={12}>
          <Card title={HelpFormTitle}>
            <HelpForm />
          </Card>
        </Col>
        <Col xs={10} lg={6}>
          <TeachingStaff
            title="Jaidha Rosenblatt"
            status="Active"
            taType="Grad"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Help;
