import React from "react";
import { Card, Row, Progress } from "antd";
import MinAvgMax from "./MinAvgMax";

class CircDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataChoice: "min" };
  }

  handleOnChange = (e) => {
    this.setState({ dataChoice: e.target.value });
  };

  percentToString() {
    var perStr = null;
    if (this.state.dataChoice === "min") {
      perStr = this.props.min;
    } else if (this.state.dataChoice === "avg") {
      perStr = this.props.avg;
    } else {
      perStr = this.props.max;
    }
    return perStr;
  }

  renderContent() {
    if (this.state.dataChoice === "min") {
      return this.props.min;
    }

    if (this.state.dataChoice === "avg") {
      return this.props.avg;
    } else {
      return this.props.max;
    }
  }

  sucPercent() {
    return (this.renderContent() / this.max) * 100;
  }

  render() {
    const title = this.props.title;
    const units = this.props.units;
    const retNewLine = (percent) => {
      return (
        <div>
          <h2>{this.percentToString()}</h2>
          <h3>{units}</h3>
        </div>
      );
    };

    const styles = {
      card: {
        lineHeight: 1.25,
        backgroundColor: "#ffffff",
      },

      paragraph1: {
        color: "#000000",
        padding: "0px",
      },
      paragraph2: {
        color: "#000000",
        padding: "10px",
      },
      data: {
        color: "#000000",
      },
    };

    return (
      <Card loading={!this.props.min} style={styles.card}>
        <Row justify="center">
          <h2 style={styles.paragraph1}>{title}</h2>
        </Row>
        <Row justify="center" align="middle">
          <Progress
            type="circle"
            strokeColor={this.props.color}
            percent={this.renderContent()}
            style={styles.paragraph2}
            format={(percent) => retNewLine(percent)}
            successPercent={this.sucPercent()}
          />
        </Row>
        <Row justify="center">
          <MinAvgMax
            name="progressSelector"
            onChange={this.handleOnChange}
            initialValue={this.state.dataChoice}
          />
        </Row>
      </Card>
    );
  }
}

/**
 * Card for highlighting metrics
 * @param title metric name ex "Wait Time"

 */

export default CircDisplay;
