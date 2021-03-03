import React from "react";
import {  Button, Row, Col, Card, Space, Carousel } from "antd";

import "./schedule.css";

import { render } from "@testing-library/react";

/**
 * Render an event from a course schedule into a card
 * @param {Object} evt temporary event object from schedule
 */
 class  EventCard extends React.Component{

  constructor(){
    super()
  }

  render(){
    return (
    <div>
      <Carousel >
        <div>
        <Card  bodyStyle = {{ overflow: "auto", width: "400px",  height: "200px" ,lineHeight: "1.7"}} className="event-card">
          <Space>
            <Space direction="vertical">
              <Row>
                <Col>
                    <h2   >{this.props.evt.dayOfWeek}</h2>
                </Col>
                <Col style = {{position: 'absolute', right: '10px'}}>
                    {this.props.isAdmin ?
                        <Button onClick = {this.props.editDay} style = {{display: "flex", float: "right"}} type="primary"> Edit Day</Button> :
                        null} 
                </Col>
              </Row>

                <p>{this.props.evt.sessions.map((item)=><h4 style = {{margin: '15px'}}>  
                    <Row>
                        <Col >
                            {item.startTime} - {item.endTime}
                        </Col>
                        <Col>
                            {item.assistants.map((ta) => <h3 style = {{ marginBottom: '5px' , marginLeft: '15px'}}>{ta}</h3>)}
                        </Col>
                    </Row>
                    </h4> )}
                </p>       
                </Space>
              </Space>
            </Card>
        </div>
        </Carousel>
    </div>
    )};}

export default EventCard;
