import React from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';


class Popup extends React.Component {
  state = { visible: true };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log("Hello", e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log("Howdy", e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default Popup;
