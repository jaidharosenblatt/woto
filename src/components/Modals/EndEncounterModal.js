import React from 'react';
import { Avatar, Button } from 'antd';
import { UserOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import { ThumbsUp, ThumbsDown, Spiderman } from "../../static/Images";
import './end-encounter-modal.css';

class EndEncounterModal extends React.Component {
    
    render(){
        
        return (
            <div className="main-div-eem">
                <div className="icon-div">
                    <img src={this.props.modalIcon} alt="active" className="icon" />
                </div>
                <div className="icon-div">
                    <p className="turn-help">End of encounter with</p>
                </div>
                
                <div className="info-div">
                   <Avatar size={20} icon={<UserOutlined />}  />
                   <div className="ta-div">
                      <p className="name">{this.props.avatar.name}</p>
                      <p className="position">{this.props.avatar.position}</p>
                   </div>
                    
                </div>
                    
                
                <div className="align-div">
                    <p className="question">Was your question addressed?</p>
                    <div className="thumbs-div">
                       <Button className="like-button" icon={<LikeOutlined style={{ fontSize: '20px' }} />}></Button>
                       <Button className="dislike-button" icon={<DislikeOutlined style={{ fontSize: '20px' }}/>}></Button>
                    </div>
                </div> 
            </div>
        );    
    }
  }
 
  
  export default EndEncounterModal;