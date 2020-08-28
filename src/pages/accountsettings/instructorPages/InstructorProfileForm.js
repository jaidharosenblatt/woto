import React, { useState, useContext } from "react";
import { Form } from "antd";
import TextInput from "../../../components/form/TextInput";
import VideoRoomUrl from "../../../components/form/VideoRoomUrl";
import SubmitButton from "../../../components/form/SubmitButton";
import API from "../../../api/API";
import { useHistory } from "react-router-dom";
import { AuthContext, actions } from "../../../contexts/AuthContext";

const InstructorProfileForm = () => {
  const { dispatch, state } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      console.log(values);
      const res = await API.editProfile(values);
      dispatch({
        type: actions.EDIT,
        payload: { user: { ...res } },
      });
      history.push("/");
    } catch (error) {
      setError(true);
    }
  };
  console.log(error);
  return (
    <Form
      initialValues={{
        ...state.user,
      }}
      onFinish={onFinish}
      layout="vertical"
    >
      <TextInput label="Name" name="name" />
      <VideoRoomUrl />
      <SubmitButton CTA="Save Changes" />
    </Form>
  );
};

export default InstructorProfileForm;
