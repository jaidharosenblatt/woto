import React from "react";
import { Form } from "antd";
import TextInputReq from "../../../components/form/TextInputReq";
import VideoRoomUrl from "../../../components/form/VideoRoomUrl";
import SubmitButton from "../../../components/form/SubmitButton";
import { connect } from "react-redux";
import { editProfile } from "../../../redux/auth/actionCreators";
import selectors from "../../../redux/selectors";

const InstructorProfileForm = (props) => {
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
      <VideoRoomUrl />
      {props.error && <p className="error">{props.error} </p>}
      <SubmitButton CTA="Save Changes" />
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
export default connect(mapStateToProps, { editProfile })(InstructorProfileForm);
