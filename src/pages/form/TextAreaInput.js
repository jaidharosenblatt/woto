import React from 'react';
import { Form, Input } from 'antd';


const TextAreaInput = ({ name, label, placeholder, ...attributeProps }) => {
    const { TextArea } = Input;

    return (
        <Form.Item name={name} label={label} colon={false} noStyle={true} >
            <TextArea {...attributeProps} />
        </Form.Item>
    );
};

export default TextAreaInput;