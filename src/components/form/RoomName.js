import React, { useContext } from "react";
import { Form, Input } from "antd";
import { AuthContext } from "../../contexts/AuthContext";

// Input a Woto Room name using a default value, "Name's Room"
const RoomName = ({ noDefault, required }) => {
  const authContext = useContext(AuthContext);
  const defaultName = `${authContext.state.user.name &&
    authContext.state.user.name.split(" ")[0]}'s Room`;
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
export default RoomName;
