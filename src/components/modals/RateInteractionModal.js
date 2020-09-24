import React, { useEffect, useState } from "react";
import { Button, Space, Col, Rate, Form } from "antd";
import MultiLineTextInput from "../form/MultiLineTextInput";
import { useForm } from "antd/lib/form/util";


/**
 * @stpledger
 * Modal that prompts a user for feedback after an interaction
 */
const RateInteractionModal = ({ hideModal, message, allowText = true }) => {
    const [allowSubmit, setAllowSubmit] = useState(false)
    const [rateVal, setRateVal] = useState(0);
    const [form] = useForm();

    const additionalFeedback = allowText ? (
        <>
            <p className="feedback-text" >Any additional feedback?</p>
            <MultiLineTextInput name="feedback" rows={4} />
        </>
    ) : null ;

    useEffect(() => {
        setAllowSubmit(rateVal > 0);
    }, [rateVal]);
  
    return (
        <Col align="middle">
            <Space direction="vertical">
                <h1>{'Feedback'}</h1>
                <Form form={form} onFinish={hideModal}>                 
                    <h2>{message}</h2>
                    <Form.Item name="rate" colon={false} noStyle={true} >
                        <Rate style={{ fontSize: "35px" }}  value={rateVal} onChange={(e) => setRateVal(e)}/>
                    </Form.Item>
                    {additionalFeedback}
                    <Form.Item noStyle={true}>
                        <Button className="submit-button" type="primary" htmlType="submit" disabled={!allowSubmit}>Submit</Button>
                    </Form.Item>
                </Form>
            </Space>
        </Col>
  );
};

export default RateInteractionModal;