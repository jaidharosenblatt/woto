import React from 'react';
import { Form, Input } from 'antd';

const MultiLineTextInput = ({name, rows = 4}) => {
    const { TextArea } = Input;

    return (
        <Form.Item name={name} colon={false} noStyle={true} >
            <TextArea rows={rows} style={{ resize: "none"}} />
        </Form.Item>
    );
};

export default MultiLineTextInput;