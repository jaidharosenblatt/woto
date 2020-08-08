import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, InputNumber } from "antd";

import TextInput from "../../components/form/TextInput";
import DataSelect from "../../components/form/DataSelect";
import SubmitButton from "../../components/form/SubmitButton";
import PhoneNumberInput from "../../components/form/PhoneNumberInput";
import VideoRoomUrl from "../../components/form/VideoRoomUrl";
import API from "../../api/API";
import { AuthContext, actions } from "../../contexts/AuthContext";

const ProfileForm = () => {
  const { dispatch, state } = useContext(AuthContext);
  const [error, setError] = useState();
  const [majors, setMajors] = useState();
  const history = useHistory();

  useEffect(() => {
    async function getMajors() {
      const schools = await API.getInstitutions();
      schools.forEach((school) => {
        if (state.user.institution === school._id) {
          setMajors(school.majors);
        }
      });
    }
    getMajors();
  }, [state.user.institution]);

  const onFinish = async (values) => {
    try {
      setError(false);
      const res = await API.editProfile({ ...values });
      dispatch({
        type: actions.EDIT,
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
        ...state.user,
      }}
      onFinish={onFinish}
      layout="vertical"
    >
      <TextInput label="Name" name="name" />
      <PhoneNumberInput />
      <Form.Item label="Graduation Year" name="graduationYear">
        <InputNumber min={2020} max={2300} />
      </Form.Item>
      <DataSelect mode="tags" options={majors} label="Major(s)" name="majors" />
      <DataSelect mode="tags" options={majors} label="Minor(s)" name="minors" />
      <VideoRoomUrl />
      {error && <p className="error">Error updating profile </p>}
      <SubmitButton CTA="Edit Profile" />
    </Form>
  );
};

export default ProfileForm;
