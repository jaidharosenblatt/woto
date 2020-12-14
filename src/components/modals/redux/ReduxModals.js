import React, { useState } from "react";
import { Modal } from "antd";
import "../modals.css";
import ModalFactory from "./ModalFactory";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";

/**
 * Render the modal's key from redux status at the top level of app
 * @param {String} modalKey
 * @param {JSX} children passed down from App
 */
const GlobalModals = (props) => {
  const [visible, setVisible] = useState(true);

  const handleCancel = () => setVisible(false);
  return (
    <>
      {props.modalKey ? (
        <Modal
          visible={visible}
          onCancel={handleCancel} // allows you to click anywhere and remove modal
          centered={true}
          footer={null}
          closable={false}
          width="auto"
          height="auto"
        >
          <ModalFactory type={props.modalKey} />
        </Modal>
      ) : (
        props.children
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    modalKey: selectors.getModalKey(state),
  };
};
export default connect(mapStateToProps)(GlobalModals);
