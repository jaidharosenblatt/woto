import React from 'react';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Bell, Spiderman } from "../../static/Images";
import './turn-help-modal.css';

class TurnHelpModal extends React.Component {
    
    render(){
        
        return (
            <div className="main-div">
                <div className="icon-div">
                    <img src={this.props.modalIcon} alt="active" className="icon" />
                </div>
                <div className="icon-div">
                    <p className="turn-help">It's your turn to get help</p>
                </div>
                
                <div className="info-div">
                   <Avatar size={20} icon={<UserOutlined />} />
                   <div className="ta-div">
                      <p className="name">{this.props.avatar.name}</p>
                      <p className="position">{this.props.avatar.position}</p>
                   </div>
                    
                </div>
                    
                
                <div className="align-div">
                    <Button className="join-zoom-button" type="primary">
                        Join Zoom
                    </Button>
                    <Button className="cancel-button" type="primary" onClick= {this.props.handleCancel} > 
                        Cancel
                    </Button>
                </div> 
            </div>
        );    
    }
  }
 
  
  export default TurnHelpModal;