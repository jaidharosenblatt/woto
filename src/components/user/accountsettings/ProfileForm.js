import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form } from "antd";

import TextInputReq from "../../form/TextInputReq";
import DataSelect from "../../form/DataSelect";
import SubmitButton from "../../form/SubmitButton";
import PhoneNumberInput from "../../form/PhoneNumberInput";
import VideoRoomUrl from "../../form/VideoRoomUrl";

import API from "../../../api/API";
import selectors from "../../../redux/selectors";
import { editProfile } from "../../../redux/auth/actionCreators";
import GraduationYearInput from "../../form/GraduationYearInput";

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
      <TextInputReq
        label="Name"
        name="name"
        placeholder="Kyle Sobel"
        message="Please input your name"
      />
      <GraduationYearInput />
      <PhoneNumberInput />
      <DataSelect mode="tags" options={majors} label="Major(s)" name="majors" />
      <DataSelect mode="tags" options={majors} label="Minor(s)" name="minors" />
      <VideoRoomUrl /> {props.error && <p className="error">{props.error} </p>}
      <SubmitButton loading={props.loading} CTA="Save Changes" />
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    error: selectors.getError(state),
    user: selectors.getUser(state),
    loading: selectors.getLoading(state),
  };
};

export default connect(mapStateToProps, { editProfile })(ProfileForm);
