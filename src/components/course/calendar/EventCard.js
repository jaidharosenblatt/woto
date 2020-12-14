import React from "react";
import { Card, Space } from "antd";
import { CalendarTwoTone } from "@ant-design/icons";
import "./schedule.css";
import TeachingStaffRow from "../teaching-staff/TeachingStaffRow";

/**
 * Render an event from a course schedule into a card
 * @param {Object} evt temporary event object from schedule
 */
const EventCard = ({ evt }) => {
  return (
    <Card className="event-card">
      <Space>
        <CalendarTwoTone />
        <Space direction="vertical">
          <h2>{evt.dayOfWeek}</h2>
          <h3>{`${evt.startTime} - ${evt.endTime}`}</h3>
        </Space>
      </Space>
      <TeachingStaffRow defaultColumns={4} staffers={evt.assistants} />
    </Card>
  );
};

export default EventCard;
