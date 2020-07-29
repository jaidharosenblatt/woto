import React, { useState } from "react";
import { Form, InputNumber } from "antd";
import TextInput from "../../components/form/TextInput";
import DataSelect from "../../components/form/DataSelect";
import SubmitButton from "../../components/form/SubmitButton";
import PhoneNumberInput from "../../components/form/PhoneNumberInput";
import VideoRoomUrl from "../../components/form/VideoRoomUrl";
import API from "../../api/API";
import { useHistory } from "react-router-dom";
const majors = ["Computer Science", "Economics", "Electrical Engineering"];

const ProfileForm = ({ user, dispatch }) => {
  const [error, setError] = useState(false);
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      const res = await API.editProfile({ ...values });
      dispatch({
        type: "EDIT",
        payload: { user: { ...res } },
      });
      history.push("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Form
      initialValues={{
        ...user,
      }}
      onFinish={onFinish}
      layout="vertical"
    >
      <TextInput label="Name" name="name" />
      <PhoneNumberInput />
      <Form.Item label="Graduation Year" name="graduationYear">
        <InputNumber min={2020} max={2300} />
      </Form.Item>
      <DataSelect mode="tags" options={majors} label="Major(s)" name="major" />
      <DataSelect mode="tags" options={majors} label="Minor(s)" name="minor" />
      <VideoRoomUrl />
      {error && <p className="error"> Error updating profile</p>}
      <SubmitButton CTA="Edit Profile" />
    </Form>
  );
};

export default ProfileForm;
