import React from "react";
import { Row, Col } from "antd";
import DataSelect from "../../../components/form/DataSelect";

/**
 * @jaidharosenblatt Two side by side inputs for Assignment and Problem using
 * an API for past questions about assignments and their problems
 */
class AssignmentProblemInput extends React.Component {
  constructor() {
    super();
    this.state = { assignment: "" };
  }

  handleAssignmentChange = (assignment) => {
    this.setState({ assignment });
  };
  render() {
    //TODO replace with network call
    const assignments = {
      hw1: ["Problem 2", "Problem 3a", "Problem 3b"],
      hw2: ["Problem 1a", "Problem 2b", "Problem 2c"],
      hw3: ["Problem 1a", "Problem 2b", "Problem 4a"],
    };

    console.log();

    const problems =
      this.state.assignment === "" ? [] : assignments[this.state.assignment];

    return (
      <Row gutter={4}>
        <Col span={12}>
          <DataSelect
            name="assignment"
            label="Assignment"
            placeholder="Choose an assignment"
            options={Object.keys(assignments)}
            handleChange={this.handleAssignmentChange}
          />
        </Col>
        <Col span={12}>
          <DataSelect
            name="problem"
            label="Problem"
            placeholder="Choose an assignment"
            options={problems}
          />
        </Col>
      </Row>
    );
  }
}

export default AssignmentProblemInput;
