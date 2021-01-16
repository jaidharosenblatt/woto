import React from "react";
import { Form } from "antd";
import TextInputReq from "../../../form/TextInputReq";
import VideoRoomUrl from "../../../form/VideoRoomUrl";
import SubmitButton from "../../../form/SubmitButton";
import { connect } from "react-redux";
import selectors from "../../../../redux/selectors";
import ErrorSuccess from "../../../util-components/error-success/ErrorSuccess";
import { editProfile } from "../../../../redux/auth/actionCreators";

const InstructorProfileForm = (props) => {
  return (
    <Form
      initialValues={{
        ...props.user,
      }}
      onFinish={props.editProfile}
      layout="vertical"
    >
      <TextInputReq
        label="Name"
        name="name"
        placeholder="Kyle Sobel"
        message="Please input your name"
      />
      <VideoRoomUrl />
      <ErrorSuccess showSuccess />
      <SubmitButton CTA="Save Changes" />
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: selectors.getUser(state),
    loading: selectors.getLoading(state),
  };
};
export default connect(mapStateToProps, { editProfile })(InstructorProfileForm);
