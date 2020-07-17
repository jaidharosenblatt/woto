import React, { useState } from "react";
import { Form, Input } from "antd";
import { useHistory } from "react-router-dom";

import SubmitButton from "../../components/form/SubmitButton";
import { PasswordInput } from "antd-password-input-strength";
import API from "../../api/API";
import ConfirmPassword from "./ConfirmPassword";

const ProfileForm = ({ user }) => {
  const [locked, setLocked] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      const res = await API.editProfile({ ...values });
      history.push("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div>
      {locked ? (
        <ConfirmPassword setLocked={setLocked} user={user} />
      ) : (
        <Form
          initialValues={{
            email: user.email,
          }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="currentPassword" label="Current Password">
            <Input.Password />
          </Form.Item>
          <Form.Item name="newPassword" label="New Password">
            <PasswordInput />
          </Form.Item>
          {error && <p className="error"> Error updating profile</p>}
          <SubmitButton CTA="Edit Account" />
        </Form>
      )}
    </div>
  );
};

export default ProfileForm;
