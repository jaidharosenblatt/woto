import React from "react";
import { Form, Input, Button, Select } from "antd";
import TimeSelect from "../../form/TimeSelect";

var teachingOptions = [
  { name: "John Smith", _id: "1" },
  { name: "Nana Thomas", _id: "2" },
  { name: "Alexander Wang", _id: "3" },
  { name: "Darren Williams", _id: "4" },
];

const teachingAssissOptions = teachingOptions.map((item) => (
  <li key={item.name}>{item.name}</li>
));

class EditScheduleSession extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { editKey, startEdit, endEdit, teachEdit } = this.props;

    const onFinish = (values) => {
      this.props.onFinishEdit(values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <div style={{ width: " 60%" }}>
        <h2>Manage Session</h2>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Start Time"
            name="start"
            rules={[
              {
                required: true,
                message: "Please pick start time.",
              },
            ]}
          >
            <Input defaultValue={startEdit} />
          </Form.Item>

          <Form.Item
            label="End Time"
            name="end"
            rules={[
              {
                required: true,
                message: "Please pick end time.",
              },
            ]}
          >
            <Input defaultValue={endEdit} />
          </Form.Item>

          <Form.Item
            label="Teaching Assistants"
            name="teach"
            rules={[
              {
                required: true,
                message: "Please select Teaching Assisstant.",
              },
            ]}
          >
            <Select
              placeholder="Select a teaching assisstant."
              mode="multiple"
              showArrow
              style={{ width: "100%" }}
              defaultValue={teachEdit}
            >
              {teachingAssissOptions}
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Create Session
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 10,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default EditScheduleSession;
