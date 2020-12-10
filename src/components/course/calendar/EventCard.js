import React from "react";
import { Avatar, Card, Space } from "antd";
import { CalendarTwoTone } from "@ant-design/icons";
import "./schedule.css";
import LeftRightRow from "../../util-components/leftrightrow/LeftRightRow";
import { DefaultProfile } from "../../../static/Images";

/**
 * Render an event from a course schedule into a card
 * @param {Object} evt temporary event object from schedule
 */
const EventCard = ({ evt }) => {
  return (
    <Card className="event-card">
      <LeftRightRow
        left={
          <Space>
            <CalendarTwoTone />
            <Space direction="vertical">
              <h2>{evt.dayOfWeek}</h2>
              <h3>{`${evt.startTime} - ${evt.endTime}`}</h3>
            </Space>
          </Space>
        }
        right={
          <Space size={8}>
            {evt.assistants.map((assistant, i) => {
              return (
                <Space key={i}>
                  <Avatar src={DefaultProfile} />
                  <p>{assistant}</p>
                </Space>
              );
            })}
          </Space>
        }
      />
    </Card>
  );
};

export default EventCard;
