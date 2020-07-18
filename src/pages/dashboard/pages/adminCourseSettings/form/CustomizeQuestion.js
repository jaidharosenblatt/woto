import React, {useState} from 'react';
import {Form, Button, Row, Col, Select, Input, Checkbox} from 'antd';
import AdjustableQuestion from "./AdjustableQuestion";
const {Option} = Select;

const CustomizeQuestion = () => {
const {form, setForm} = useState([]);

const onConfirm = (values) => {
    console.log(values);

}

    return(
    <>
        <Row gutter={[0,10]}>
            <Col>
                <h1>Customize Your Question Form Here:</h1>
                <p>Enter in the fields you want students to fill out and preview the form will look like</p>    
            </Col>
        </Row>
        <Row>
        <Col>
            <AdjustableQuestion questionForm={form} />
        </Col>  
            <Col>
            
        <div style={{position:"relative", left:"10px", width:"550px", paddingRight:"50px"}}>

    <Form onFinish={onConfirm} layout="vertical" >
        <Form.Item name="label" label="Field 1"> <Input/></Form.Item>
      
       <Form.Item name="type">
       <Select style={{width:"500px"}}>
            <Option value="input">Input</Option>
            <Option value="select">Select</Option>
            <Option value="tags"> Tag Select</Option>
        </Select>
       </Form.Item>

       <Form.Item name="options">
       <Select mode="tags" showArrow={false} style={{width:"500px"}} dropdownStyle={{display:"none"}}>
        </Select>
       </Form.Item>

       
       <Form.Item name="checkboxes">
           <Checkbox.Group>
               <Checkbox value="NA" > Include NA as an option</Checkbox>
               <Checkbox value="required" > Should this field be required?</Checkbox>
         </Checkbox.Group> 
       </Form.Item>
       

       <Button type="primary" htmlType="submit" block>
            Submit Form
        </Button>
    </Form> 
                </div>
            </Col>
              
        </Row>
        
                
        
    </>)
}
export default CustomizeQuestion;