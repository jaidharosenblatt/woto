import React from 'react';
import { Modal, Button } from 'antd';
import './popup.css';

class Popup extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  
  
  render() {
    
    const ModalContent = this.props.content;
      
    return (
      <div>
        <Button className="button" type="primary" onClick={this.showModal} >
          {this.props.buttonText}
        </Button>
        <Modal 
            visible={this.state.visible}  
            onCancel={this.handleCancel} // allows you to click anywhere and remove modal
            centered={true}
            footer={null}
            closable={false}
            width="auto"
            height="auto"
            >
                
            
            <ModalContent handleCancel={this.handleCancel} avatar={this.props.avatar} modalIcon ={this.props.modalIcon} />
                
        </Modal>
      </div>
      
    );
  }
}

export default Popup;
