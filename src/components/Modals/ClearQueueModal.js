import React from 'react';
import { Avatar, Button } from 'antd';
import { UserOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import { ThumbsUp, ThumbsDown, Spiderman } from "../../static/Images";
import './ta-modals.css';

class ClearQueueModal extends React.Component {
    
    render(){
        
        return (
            <div className="main-div-cqm">
                <div className="icon-div">
                    <img src={this.props.modalIcon} alt="active" className="icon" />
                </div>
                <div className="sure-div">
                    <p className="cancel-message">Are you sure you want to clear the queue? </p> 
                </div>
                    
                
                <div className="align-div">
                    <div className="align-div">
                        <Button className="cancel-button-clear" type="primary" onClick= {this.props.handleCancel} > 
                            Cancel
                        </Button>
                        <Button className="clear-queue-button" type="primary">
                            Clear Queue
                        </Button>
                    </div> 
                </div> 
            </div>
        );    
    }
  }
 
  
  export default ClearQueueModal;