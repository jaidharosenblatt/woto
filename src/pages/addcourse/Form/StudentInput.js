import React, {useState} from "react";
import {Input, Row, Upload, Button, Col, Space, Tag} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import SubmitButton from "../../../components/form/SubmitButton";
const {TextArea} = Input;



const StudentInput = () => {
const [students, setStudents] = useState("");
const [tags, setTags] = useState([]);
const [tagstrings, setTagStrings] = useState([]);
const [error, setError] = useState("");

const onChange = ( {target: {value}} ) => {
  setStudents(value);
}

 const removeTag = (removedtag)=> {
   var newtagstrings = tagstrings.filter(tag => tag !== removedtag);
   setTagStrings(newtagstrings);

}

const onAddTags = () => {
  var temp = students.split(";");

  if(students !== ""){
    temp.map(email => {
      var newtags = tags;
      var newtagstrings = tagstrings;

      if(!newtagstrings.includes(email)){
        newtags.push(<Tag closable onClose={() => removeTag(email)} key={email}> {email} </Tag>);
        newtagstrings.push(email);
        setTags(newtags);
        setTagStrings(newtagstrings);
        setError("");
      }
      else{
        setError("Duplicate Emails will not be repeated");
      }
    });
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
    <Row gutter={[0, 10]} align = "center">
      <h2> Add Students to your New Course</h2>
    </Row>

      <Row gutter={[0, 10]} align = "center">
        <Col span={24}>
        <div style={{width:"100%", paddingBottom:"5px"}}>
        {tags}
        </div>
          <TextArea
                value={students}
                onChange={onChange}
                placeholder="Input Student emails, semicolon delimited:
                mss91@duke.edu;jrr59@duke.edu;ttl45@duke.edu"
                autoSize={{ minRows:3 , maxRows: 5 }}
                mode="tag"
            />

          </Col>
      </Row>


      <Row gutter={[10,0]} align="center">
        <Col>
        <Button onClick={onAddTags} type="primary" htmlType="submit" block>
          Add Students
        </Button>
        </Col>
        <p style={{paddingTop:"5px"}}> or </p>
        <Col>
          <Upload
            accept = ".csv"
            beforeUpload={beforeUpload}
            >
            <Button>
              <UploadOutlined /> Upload from csv
            </Button>
          </Upload>
        </Col>

      </Row>
      {error}


  </>)
}

export default StudentInput;
