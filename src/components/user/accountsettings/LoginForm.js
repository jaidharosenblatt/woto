import React, { useState } from "react";
import { Form } from "antd";

import SubmitButton from "../../form/SubmitButton";
import PasswordWithConfirm from "../../form/PasswordWithConfirm";
import ConfirmPassword from "./ConfirmPassword";
import EduEmail from "../../form/EduEmail";
import { connect } from "react-redux";
import { editProfile } from "../../../redux/auth/actionCreators";
import selectors from "../../../redux/selectors";
import ErrorSuccess from "../../util-components/error-success/ErrorSuccess";

const ProfileForm = (props) => {
  const [locked, setLocked] = useState(true);
  //Get "duke" from "email@duke.edu"
  const schoolDomain = props.user.email.split("@")[1];

  const edit = async (values) => {
    const user = { email: values.email, password: values.password };
    await props.editProfile(user);
  };

  return (
    <div>
      {locked ? (
        <ConfirmPassword setLocked={setLocked} user={props.user} />
      ) : (
        <Form
          hideRequiredMark
          initialValues={{
            email: props.user.email,
          }}
          onFinish={edit}
          layout="vertical"
        >
          <p>Edit your login credentials</p>
          <EduEmail school={schoolDomain} />
          <PasswordWithConfirm />
          <ErrorSuccess showSuccess />
          <SubmitButton loading={props.loading} CTA="Edit Account" />
        </Form>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: selectors.getUser(state),
    loading: selectors.getLoading(state),
  };
};
export default connect(mapStateToProps, { editProfile })(ProfileForm);
