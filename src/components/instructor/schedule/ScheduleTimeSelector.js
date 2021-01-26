import { Select } from "antd";
import Form from "antd/lib/form/Form";
import React from "react";
import util from "../../../util";
import SubmitButton from "../../form/SubmitButton";
import TimeSelect from "../../form/TimeSelect";

export default function ScheduleTimeSelector() {
  var upcomingtimes = [];

  const fifteenMins = 1000 * 60 * 15;
  var date = new Date(); //or use any other date

  var rounded = new Date(
    Math.floor(date.getTime() / fifteenMins) * fifteenMins
  );

  for (let i = 0; i < 24 * 4; i++) {
    const time = new Date(rounded.getTime() + i * fifteenMins);
    upcomingtimes[time] = util.convertCreatedAt(time);
  }

  var options = [];
  Object.keys(upcomingtimes).forEach((time) => {
    options.push(
      <Select.Option key={time} value={time}>
        {upcomingtimes[time]}
      </Select.Option>
    );
  });

  return (
    <Form onFinish={(val) => console.log(val)}>
      <TimeSelect options={options} />
      <SubmitButton CTA="TEST" />
    </Form>
  );
}
