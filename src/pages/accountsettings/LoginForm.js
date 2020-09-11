import React, { useState, useContext } from "react";
import { Form } from "antd";
import { useHistory } from "react-router-dom";

import SubmitButton from "../../components/form/SubmitButton";
import PasswordWithConfirm from "../../components/form/PasswordWithConfirm";
import { AuthContext, actions } from "../../contexts/AuthContext";
import API from "../../api/API";
import ConfirmPassword from "./ConfirmPassword";
import EduEmail from "../../components/form/EduEmail";

const ProfileForm = () => {
  const { dispatch, state } = useContext(AuthContext);
  const [locked, setLocked] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();
  //Get "duke" from "email@duke.edu"
  const schoolDomain = state.user.email.split("@")[1];
  console.log(schoolDomain);
  const onFinish = async (values) => {
    try {
      const user = { email: values.email, password: values.password };
      console.log(user.email);
      const res = await API.editProfile({ ...user });
      history.push("/");
      dispatch({
        type: actions.EDIT,
        payload: { user: { ...res } },
      });
    } catch (error) {
      setError(true);
    }
  };

  const onChange = (values) => {
    // const user = { email: values.email, password: values.password };
    console.log(values.target.value);
  };

  return (
    <div>
      {locked ? (
        <ConfirmPassword setLocked={setLocked} user={state.user} />
      ) : (
        <Form
          onChange={onChange}
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
