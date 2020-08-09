import React, { useContext } from "react";
import { Form, Input } from "antd";
import { AuthContext } from "../../contexts/AuthContext";

// Input a Woto Room name using a default value, "Name's Room"
const RoomName = () => {
  const authContext = useContext(AuthContext);
  const defaultName = `${authContext.state.user.name &&
    authContext.state.user.name.split(" ")[0]}'s Room`;
  return (
    <Form.Item label="Room Name" initialValue={defaultName} name="roomName">
      <Input />
    </Form.Item>
  );
};
export default RoomName;