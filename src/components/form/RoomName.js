import React from "react";
import { Form, Input } from "antd";
import { connect } from "react-redux";

import selectors from "../../redux/selectors";

/**
 * Input a Woto Room name using a default value, "Name's Room"
 * @param {Boolean} noDefault do not use the default name
 * @param required make this field required
 */
const RoomName = ({ noDefault, required, name }) => {
  const defaultName = `${name.split(" ")[0]}'s Room`;
  return (
    <Form.Item
      label="Room Name"
      initialValue={!noDefault ? defaultName : undefined}
      name="roomName"
      rules={[
        {
          required: required,
          message: "Please include a room name",
        },
      ]}
    >
      <Input />
    </Form.Item>
  );
};

const mapStateToProps = (state, prevProps) => {
  return {
    ...prevProps,
    name: selectors.getUserName(state),
  };
};
export default connect(mapStateToProps)(RoomName);
