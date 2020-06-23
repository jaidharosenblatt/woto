import React from "react";
import { Input, Row, Button, Space, Col, Radio, Select, Form } from "antd";
import { BlueQuestionMarkIcon, GrayQuestionMarkIcon } from "./tools/Icons";
import "./YourQuestionModal.css";
import "../../pages/help/Help.css";
import SegmentedControl from "../../components/form/SegmentedControl";
import AssignmentProblemInput from "../../pages/help/Form/AssignmentProblemInput";
import TextInput from "../../components/form/TextInput";
import SubmitButton from "../../components/form/SubmitButton";
import DataSelect from "../../components/form/DataSelect";
import StageSelect from "../../pages/help/Form/StageSelect";

class YourQuestionModal extends React.Component {
    constructor() {
      super();
      this.state = { isAssignment: true, collaborate: true };
    }
    handleOnChange = (event) => {
      if (event.target.name === "isAssignment")
        this.setState({ isAssignment: event.target.value });
      if (event.target.name === "collaborate")
        this.setState({ collaborate: event.target.value });
    };
  
    // Temporary
    onFinish = (values) => {
      console.log("Success:", values);
    };
  
    onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
  
    render() {
      //temp
      const concepts = ["Linked List", "Array", "Queue", "Algorithms"];
  
      // Conditionally render based on if user is asking about an assignment
      const assignmentFields = this.state.isAssignment ? (
        <div>
          <AssignmentProblemInput />
          <StageSelect
            name="stage"
            label="Stage"
            placeholder="Where do you think you are in the problem?"
          />
          <DataSelect
            mode="tags"
            name="concepts"
            label="Concepts"
            placeholder="Tag your question"
            options={concepts}
          />
        </div>
      ) : null;
  
      // Conditionally render based on if user opts into collaboration
      const meetingUrl = this.state.collaborate ? (
        <TextInput
          label="Meeting URL for Collaboration"
          name="meetingUrl"
          placeholder="https://duke.zoom.us/j/123456789"
        />
      ) : null;
  
      return (



        <Form initialValues={{ isAssignment: true, collaborate: true}} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed} layout="vertical">

          <Row>
            <BlueQuestionMarkIcon />
            <h1 style={{padding:"5px"}}>Your Question</h1>
            <Col span={10}>
                <Row justify="end">
                    <Button type="primary" danger>
                        Leave Queue
                    </Button>
                </Row>
            </Col>
          </Row>

          <SegmentedControl
            name="isAssignment"
            onChange={this.handleOnChange}
            options={[
              {
                label: "Assignment",
                value: true,
              },
              {
                label: "Concept",
                value: false,
              },
            ]}
          />
          {assignmentFields}
          <TextInput
            label="Question"
            name="question"
            placeholder="How do I reverse a linked list..."
          />
          <SegmentedControl
            name="collaborate"
            options={[
              {
                label: "Collaborate while I wait",
                labelMobile: "Collaborate",
                value: true,
              },
              {
                label: "I prefer to wait alone",
                labelMobile: "Wait Alone",
                value: false,
              },
            ]}
            onChange={this.handleOnChange}
          />
  
          {meetingUrl}
          
          <div style={{ padding: "0 8px 0 0", float: "left", width: '50%'}} >
              <Button type="primary" block>Edit</Button>
          </div>
          <div style={{ padding: "0 0 8px 0", float: "right", width: '50%'}} >
              <Button block>Cancel</Button>
          </div>

            
          
            
          
          
        </Form>
      );
    }
  }
  
  export default YourQuestionModal;


/*function handleChange(value) {
    console.log(`selected ${value}`);
  }

const { Option } = Select;

const YourQuestionModal = () => {
    return (
        <Col align="left">
        <Space direction="vertical">
            <div style={{ clear: "both", width: '100%', alignItems: "center"}} >
                <div style={{float: "left", display: "flex", alignItems: "center"}}>
                    <BlueQuestionMarkIcon />
                    <h1>Your Question</h1>
                </div>
                <div style={{float: "right"}}>
                        <Button type="primary" style={{ marginLeft: "auto" }} danger>
                            Leave Queue
                        </Button>
                </div>
            </div>

            <Radio.Group defaultValue="a" buttonStyle="solid">
                <View style={{textAlign: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Radio.Button value="a" size="middle">Assignment</Radio.Button>
                        <Radio.Button value="b" size="middle">Concept</Radio.Button>
                    </View>
                </View>
            </Radio.Group>

            <Text>Assignment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Problem</Text>

            <View style={{flexDirection: 'row'}}>
                <Select defaultValue="1" style={{ width: 250 }} onChange={handleChange}>
                    <Option value="one">1</Option>
                    <Option value="two">2</Option>
                    <Option value="three">3</Option>
                    <Option value="four">4</Option>
                </Select>
                <Select defaultValue="1" style={{ width: 250 }} onChange={handleChange}>
                    <Option value="one">1</Option>
                    <Option value="two">2</Option>
                    <Option value="three">3</Option>
                    <Option value="four">4</Option>
                </Select>
            </View>

            <Text>Where do you think you are in the problem?</Text>
            <View style={{flexDirection: 'row'}}>
                <Select defaultValue="Just getting started" style={{ width: 500 }} onChange={handleChange}>
                    <Option value="first_stage">Just getting started</Option>
                    <Option value="second_stage">Stuck in the middle</Option>
                    <Option value="third_stage">Finished but have questions</Option>
                </Select>
            </View>

            <Text>Question</Text>
            <Input placeholder="How do I reverse a linked list..." />

            <View style={{flexDirection: 'row'}}>
                <Radio.Group defaultValue="a" buttonStyle="solid">
                    <View style={{textAlign: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Radio.Button value="a" size="middle">Collaborate while you wait</Radio.Button>
                            <Radio.Button value="b" size="middle">I prefer to wait alone</Radio.Button>
                        </View>
                    </View>
                </Radio.Group>
                <Text>&nbsp;&nbsp;</Text>
                <GrayQuestionMarkIcon />
            </View>

            <Text>Zoom URL</Text>
            <Input placeholder="How do I reverse a linked list..." />

            <View style={{flexDirection: 'row'}}>
                <Button type="primary" size="large" style={{ width: 240 }}>Edit</Button>
                <Text>&nbsp;&nbsp;&nbsp;</Text>
                <Button type="primary"  size="large" disabled style={{ width: 240 }}>Cancel</Button>
            </View>
            

        </Space>
      </Col>
    );
};





export default YourQuestionModal;*/