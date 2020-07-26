import React, { useState } from "react";
import { Form } from "antd";
import { useHistory } from "react-router-dom";

import SubmitButton from "../../components/form/SubmitButton";
import PasswordWithConfirm from "../../components/form/PasswordWithConfirm";

import API from "../../api/API";
import ConfirmPassword from "./ConfirmPassword";
import EduEmail from "../../components/form/EduEmail";

const ProfileForm = ({ dispatch, user }) => {
  const [locked, setLocked] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();
  //Get "duke" from "email@duke.edu"
  const schoolDomain = user.email.split("@")[1].split(".")[0];

  const onFinish = async (values) => {
    try {
      const user = { email: values.email, password: values.password };
      const res = await API.editProfile({ ...user });
      history.push("/");
      dispatch({
        type: "EDIT",
        payload: { user: { ...res } },
      });
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
          <EduEmail school={schoolDomain} />
          <PasswordWithConfirm />
          {error && <p className="error"> Error updating profile</p>}
          <SubmitButton CTA="Edit Account" />
        </Form>
      )}
    </div>
  );
};

export default ProfileForm;
