import React from 'react';
import {Form, Button, Input, Select, Card, Space} from 'antd';

const {Option} = Select;



const AdjustableQuestion = ({questionForm = [
    {
        type: "select",
        label:"Assignment",
        options:["hw1", "APT2"],
        required: "true",
        includeNA: "true"
    },
    {
        type: "select",
        label:"Stage",
        options:["Just getting Started", "Having a Solution"],
        required: "true",
        includeNA: "true"
    },
    {
        type: "tags",
        label:"Concepts",
        options:["Linked List", "Array"],
        required: "true",
        includeNA: "false"
    },
    {
        type: "input",
        label:"Details",
        required: "true"
    }
]}) =>{
const renderQuestionForm = [];

const updateField = (field, index) =>{
    
}

function renderOptions(options){
    const ret = [];
    options.forEach((option)=>{
        ret.push(
            <Option key={option} value={option}>{option}</Option>
        )
    });
  
    return(ret);
}

questionForm.forEach((item)=>{
    if(item.type==="input"){
        renderQuestionForm.push(
        <Form.Item key={item.label} label={item.label} name={item.label} rules={[{required:item.required}]}>
            <Input/>
        </Form.Item>)
    }
    if(item.type==="select"){
        const Options = renderOptions(item.options);
    
        renderQuestionForm.push(
            <Form.Item key={item.label} label={item.label} name={item.label} rules={[{required:item.required}]}>
                <Select>
                    {Options}
                </Select>
            </Form.Item>
        )
    }
    if(item.type==="tags"){
        const Options = renderOptions(item.options);
       
        renderQuestionForm.push(
            <Form.Item key={item.label} label={item.label} name={item.label} rules={[{required:item.required}]}>
                <Select mode="tags">
                    {Options}
                </Select>
            </Form.Item>
        )
    }

});


return(
<>
        <Card
            title={
              <Space direction="vertical">
                <h2>I'm Working On</h2>
                <p>
                  Submit what you are working on in order to work together with
                  your classmates.
                </p>
              </Space>
            }
          >
        
        <Form layout="vertical" >
            {renderQuestionForm}

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Submit Your Question
                </Button>
            </Form.Item>
        </Form>
 
          </Card>
   
</>)

}

export default AdjustableQuestion;