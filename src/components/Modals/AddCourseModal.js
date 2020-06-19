import React from 'react';
import { Button, Input } from 'antd';
import { UserOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import './add-course-modal.css';

class AddCourseModal extends React.Component {
    
    render(){
        
        return (
            <div className="main-div-acm">
                <div className="icon-div">
                    <img src={this.props.modalIcon} alt="active" className="icon" />
                </div>
                <div className="icon-div">
                    <p className="turn-help">Add a course</p>
                </div>
                
                <div className="input-div">
                    <Input className="course-input" placeholder="CS 201" />
                </div>
                    
                
                <div className="align-div">
                    <Button className="add-course-button" type="primary">
                        Add Course
                    </Button>
                    <Button className="cancel-button-acm" type="primary" onClick= {this.props.handleCancel} > 
                        Cancel
                    </Button>
                </div> 
            </div>
        );    
    }
  }
 
  
  export default AddCourseModal;