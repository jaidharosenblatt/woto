import {Form, Input, Button, Radio, Modal} from "antd";
import React, {useState, useCallback} from "react";
import Popup from './Popup';
import "./components.css";

const HelpForm = () => {

    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    
    
    const [visible, setVisible] = useState(false);
    
    const showModal = () => {
        
        setVisible(true);
    };

    const handleOk = e => {
      console.log("Hello", e);
      setVisible(false);
    };

    const handleCancel = e => {
      console.log("Howdy", e);
      setVisible(false);
    };

    return (<Form name="basic" initialValues={{
            remember: true
        }} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
        <Form.Item name="layout">
            <Radio.Group defaultValue="assignment" buttonStyle="solid" className="control" block="block">
                <Radio.Button className="shit" value="assignment">
                    Assignment
                </Radio.Button>
                <Radio.Button value="concept">Concept</Radio.Button>
            </Radio.Group>
        </Form.Item>
        <Form.Item label="Question" name="question" colon={false}>
            <Input placeholder="How do I reverse a linked list..."/>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" block="block" onClick={showModal}>
                Submit
            </Button>
            <Modal
              title="Basic Modal"
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
        </Form.Item>
    </Form>);
};


export default HelpForm;
