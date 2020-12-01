import React, { useState, useContext } from "react";
import { Form } from "antd";
import { useHistory } from "react-router-dom";

import SubmitButton from "../../components/form/SubmitButton";
import PasswordWithConfirm from "../../components/form/PasswordWithConfirm";
import { AuthContext } from "../../contexts/AuthContext";
import API from "../../api/API";
import ConfirmPassword from "./ConfirmPassword";
import EduEmail from "../../components/form/EduEmail";

const ProfileForm = () => {
  const { state } = useContext(AuthContext);
  const [locked, setLocked] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();
  //Get "duke" from "email@duke.edu"
  const schoolDomain = state.user.email.split("@")[1];
  const onFinish = async (values) => {
    try {
      const user = { email: values.email, password: values.password };
      await API.editProfile({ ...user });
      history.push("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div>
      {locked ? (
        <ConfirmPassword setLocked={setLocked} user={state.user} />
      ) : (
        <Form
          initialValues={{
            email: state.user.email,
          }}
          onFinish={onFinish}
          layout="vertical"
        >
          <p>Edit your login credentials</p>
          <EduEmail school={schoolDomain} />
          <PasswordWithConfirm />
          {error && <p className="error"> Error updating profile </p>}
          <SubmitButton CTA="Edit Account" />
        </Form>
      )}
    </div>
  );
};

export default ProfileForm;
