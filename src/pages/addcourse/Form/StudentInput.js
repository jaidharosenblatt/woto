import React, {useState} from "react";
import {Input, Row, Upload, Button, Col, Space, Tag} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import API from "../../../api/API";
import SubmitButton from "../../../components/form/SubmitButton";
import "../addcourse.css"
const {TextArea} = Input;




const StudentInput = () => {
const [students, setStudents] = useState("");
const [tags, setTags] = useState([]);
const [error, setError] = useState("");
const [message, setMessage] = useState("");
const [text, setText]= useState("Skip for now");


const onConfirm = async () =>{
  console.log("Inviting Emails", tags)
  // try{
  //   const response = await API.inviteEmails(course._id, tags);
  //   console.log(response);
  // } catch(e){
  //   console.error(e);
  // }
  console.log("invited")
}

const onChange = ( {target: {value}} ) => {
  setStudents(value);
}

 const removeTag = (removedtag)=> {
   const newtags = tags.filter(tag => tag !== removedtag);
   setTags(newtags);
}

const onAddTags = () => {
  var temp = students.split(";");
  setText("Confirm");

  if(students !== ""){
    var count = 0;
    temp.map(email => {
      var newtags = tags;
      if(!newtags.includes(email)){
        count= count+1;
        newtags.push(email);
        setTags(newtags);
      }
      else{
        setError("Duplicate Emails will not be repeated. ");
        setMessage("");
      }
    });
  }
  if(count>0){
    setMessage(`Added ${count} students.`);
  }
    setStudents("");
  }


const beforeUpload = (file) =>{
  const reader= new FileReader();
  reader.onload = e => {
    setStudents(e.target.result);
  }
  reader.readAsText(file);
  return false;
}

return (
  <>
    <Row align = "center" gutter={[0, 10]}>
      <h2> Add Students to your New Course</h2>
    </Row>

      <Row gutter={[0, 10]} align = "center">
        <Col span={24}>
        <div style={{width:"100%", paddingBottom:"5px", maxHeight: "250px", overflowY:"auto"}}>

          {tags.map(email=>{
            return(<Tag closable onClose={() => removeTag(email)} key={email}> {email} </Tag>);
          })}
          </div>
        </Col>
      </Row>
      <Row gutter={[0,10]} align="center">
        <Col span={24}>
          <TextArea
                value={students}
                onChange={onChange}
                placeholder="Input Student emails, semicolon delimited.                                              For example: mss91@duke.edu;jrr59@duke.edu;ttl45@duke.edu..."
                autoSize={{ minRows:3 , maxRows: 5 }}
                mode="tag"/>
          </Col>
      </Row>
      <Row align="right" gutter={[0,10]}>
      <p style={{color:"#ff4d4f"}}>
        {error}
      </p>
      <p>
        {message}
      </p>
      </Row>
      <Row gutter={[10,0]} align="center">
        <Col span={12}>
        <Button onClick={onAddTags} type="primary" htmlType="submit" block>
          Add Students
        </Button>
        </Col>

        <Col span={12}>
          <Upload
            accept = ".csv"
            beforeUpload={beforeUpload}
            showUploadList={false}>
            <Button block>
              <UploadOutlined /> Upload from csv
            </Button>
          </Upload>
        </Col>
      </Row>
      <Space direction="vertical" size="large">
      <p style={{color:"#bfbfbf",fontSize:"12px"}}> *Teaching assistants need to be added as students and
      promoted in course settings. </p>




        <Button block type="success" onClick={onConfirm}>
          {text}
        </Button>



      </Space>



  </>);
}

export default StudentInput;
