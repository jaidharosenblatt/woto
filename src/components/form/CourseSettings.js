import React from 'react';
import NumberFormat from 'react-number-format';
import {Form, Select} from 'antd';
import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";
import "./form.css";
const { Option } = Select;


/*
 * @matthewsclar Form component for course settings
 *
 */
 const course = {
   name: "Design and Analysis of Algorithms",
   number: "CSS 330",
   semester: "Summer 2020",
   studentcode: "ABC123",
   tacode: "DEF456",
   interactionlength: "10 minutes",
   collabsize: "3 students"
 }
 //Will eventually be an API call to get the semester options at a given university
 var semesteroptions = (
   <Option />
 )

class CourseSettings extends React.Component{
  constructor(props) {
    super(props);
    this.state = { disabled: true};
  }
  onFinish = (values) => {
    console.log(values);
  };
  onChange = () =>{
    this.setState({
      disabled:false
    })
  }
render(){
  return(
    <div className="CourseSettingsFormWrapper">
    <Form
     layout="vertical"
     onFinish={this.onFinish}
     onFieldsChange={this.onChange}>
    
    <br/>
    <br/>

        <TextInput name="coursename" label="Name" placeholder={course.name} />
        <TextInput name="coursenumber" label="Course Number" placeholder={course.number} />

        <Form.Item name="semester" label="Semester" placeholder={course.semester} >
          <Select placeholder={course.semester} >
            {semesteroptions}
          </Select>
        </Form.Item>

        <TextInput name="studentcode" label="Student Entry Course Code" placeholder={course.studentcode} />
        <TextInput name="tacode" label="Teaching Assistant Entry Course Code" placeholder={course.tacode} />

        <Form.Item
        label="Suggested Interaction Length (in minutes)"
        name="interactionlength"
        colon={false}
        >
        <NumberFormat className="ant-input"
          suffix={" minutes"}
          placeholder={course.interactionlength}
        />
        </Form.Item>

        <Form.Item label="Max Collaboration Size" name="collabsize" colon={false} >
        <NumberFormat className="ant-input"
          suffix=" students"
          placeholder={course.collabsize}
        />
        </Form.Item>

        <SubmitButton CTA="Apply Changes" disabled={this.state.disabled}/>

    </Form>
    </div>
  )
}
}

export default CourseSettings;
