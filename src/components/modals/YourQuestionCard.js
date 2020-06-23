import React from "react";
import { View, Text } from "react-native";
import {Space, Col, Row} from "antd";
import SubmitButton from "../form/SubmitButton";
import { BluePencilIcon, GrayClipboardIcon, GrayPageIcon, GrayLinesIcon, GrayQuestionMarkIcon } from "./tools/Icons";


const YourQuestionCard = ({}) => {
    return (
        <Col align="left">
        <Space direction="vertical">
            <Row>
                <h1 style={{color: "black", padding: "0 5px"}}>Your Question</h1>
                <BluePencilIcon />
            </Row>

            <Row>
                <GrayClipboardIcon />
                <p style={{padding: "0 8px"}}>Assignment 3</p>
            </Row>

            <Row>
                <GrayPageIcon />
                <p style={{padding: "0 8px"}}>Problem 1</p>
            </Row>

            <Row>
                <GrayLinesIcon />
                <p style={{padding: "0 8px"}}>Just getting started</p>
            </Row>

            <Row>
                <GrayQuestionMarkIcon />
                <p style={{padding: "0 8px"}}>Don't know what a linked list is</p>
            </Row>
        </Space>
      </Col>
    );
};


export default YourQuestionCard;