import React, { useEffect, useState } from "react";
import { Button, Space, Col, Rate, Form } from "antd";
import TextAreaInput from "../form/TextAreaInput";

/**
 * @stpledger
 * Modal that prompts a user for feedback after an interaction
 * @param hideModal callback function for cancel
 * @param handleFeedback callback function to submit feedback
 * @param message message to display above the stars
 * @param allowText allow user to submit additional text feedback
 */
const RateInteractionModal = ({ hideModal, message, allowText = false, handleFeedback }) => {
    const [allowSubmit, setAllowSubmit] = useState(false);
    const [rateVal, setRateVal] = useState(0);

    const additionalFeedback = allowText ? (
        <>
            <p className="feedback-text" >Any additional feedback?</p>
            <TextAreaInput name="feedback" rows={4} cols={50} style={{ resize: "none"}} />
        </>
    ) : null ;

    useEffect(() => {
        setAllowSubmit(rateVal > 0);
    }, [rateVal]);

    const finished = values => {
        if (typeof(handleFeedback) === "function") {
            handleFeedback(values);
        }
        hideModal();
    };
  
    return (
        <Col align="middle">
            <Form onFinish={finished}>
                <Space direction="vertical"> 
                    <h1>{'Feedback'}</h1>                
                    <h2>{message}</h2>
                    <Form.Item name="rate" colon={false} noStyle={true} >
                        <Rate style={{ fontSize: "35px" }}  onChange={(e) => setRateVal(e)}/>
                    </Form.Item>
                    {additionalFeedback}
                    <Form.Item noStyle={true}>
                        <Button className="submit-button" type="primary" htmlType="submit" disabled={!allowSubmit}>Submit</Button>
                    </Form.Item>
                </Space>
            </Form>
        </Col>
  );
};

export default RateInteractionModal;