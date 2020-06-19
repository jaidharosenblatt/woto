import React from 'react';
import { Avatar, Button } from 'antd';
import { UserOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import { ThumbsUp, ThumbsDown, Spiderman } from "../../static/Images";
import './cancel-question-modal.css';

class CancelQuestionModal extends React.Component {
    
    render(){
        
        return (
            <div className="main-div-cqm">
                <div className="icon-div">
                    <img src={this.props.modalIcon} alt="active" className="icon" />
                </div>
                <div className="sure-div">
                    <p className="cancel-message">Are you sure you want to cancel your question? </p> 
                </div>
                    
                
                <div className="align-div">
                    <p className="lose-spot">You will lose your spot in the queue</p>
                    <div className="align-div">
                        <Button className="cancel-button" type="primary" onClick= {this.props.handleCancel} > 
                            Cancel
                        </Button>
                        <Button className="join-zoom-button" type="primary">
                            Remove me
                        </Button>
                    </div> 
                </div> 
            </div>
        );    
    }
  }
 
  
  export default CancelQuestionModal;