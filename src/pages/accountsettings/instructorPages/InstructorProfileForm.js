import React, { useState } from "react";
import { Form } from "antd";
import TextInput from "../../../components/form/TextInput";
//import DataSelect from "../../../components/form/DataSelect";
import SubmitButton from "../../../components/form/SubmitButton";
//import PhoneNumberInput from "../../../components/form/PhoneNumberInput";
import API from "../../../api/API";
//import { useHistory } from "react-router-dom";
//const majors = ["Computer Science", "Economics", "Electrical Engineering"];

const InstructorProfileForm = ({ user, dispatch }) => {
  const [error, setError] = useState(false);
  //const history = useHistory();

  const onFinish = async (values) => {
    try {
      console.log(values);
      const res = await API.editProfile(values);
      dispatch({
        type: "EDIT",
        payload: { user: { ...res } },
      });
      //history.push("/");
    } catch (error) {
      setError(true);
    }
  };
  console.log(error);
  return (
    <Form
      initialValues={{
        ...user,
      }}
      onFinish={onFinish}
      layout="vertical"
    >
      <TextInput label="Name" name="name" />
      <SubmitButton CTA="Edit Profile" />
    </Form>
  );
};

export default InstructorProfileForm;
