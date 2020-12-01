import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, InputNumber } from "antd";

import TextInput from "../../components/form/TextInput";
import DataSelect from "../../components/form/DataSelect";
import SubmitButton from "../../components/form/SubmitButton";
import PhoneNumberInput from "../../components/form/PhoneNumberInput";
import VideoRoomUrl from "../../components/form/VideoRoomUrl";

import API from "../../api/API";
import selectors from "../../redux/selectors";
import auth from "../../redux/auth/actionCreators";

/**
 * Edit profile for a user
 * @param {Boolean} loading global loading state
 * @param {Boolean} error error from server
 * @param {Function} editProfile actionCreator for editing profile
 */
const ProfileForm = (props) => {
  const [majors, setMajors] = useState();
  const myInstitution = props.user.institution;
  useEffect(() => {
    async function getMajors() {
      const schools = await API.getInstitutions();
      schools.forEach((school) => {
        if (myInstitution === school._id) {
          setMajors(school.majors);
        }
      });
    }
    getMajors();
  }, [myInstitution]);

  return (
    <Form
      initialValues={{
        ...props.user,
      }}
      onFinish={(changes) => props.editProfile(changes)}
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
      {props.error && <p className="error">{props.error} </p>}
      <SubmitButton loading={props.loading} CTA="Save Changes" />
    </Form>
  );
};

const { editProfile } = auth;
const mapStateToProps = (state) => {
  return {
    error: selectors.getError(state),
    user: selectors.getUser(state),
    loading: selectors.getLoading(state),
  };
};

export default connect(mapStateToProps, { editProfile })(ProfileForm);
