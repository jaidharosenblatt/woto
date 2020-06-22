import React from 'react';
import {Select, Form, Space} from 'antd';
const {Option}  = Select;
/**
 * @MatthewSclar Component used for a time selector
 * @param
 * @param
 * @param
 */


class TimeSelector extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      time: '',
      upcomingtimes:[],
      disabledtimes:[]
    };
  }

 getTime(){
    var date,currhour, currminute, timeType, fullTime;
    var closestFifteen = 0;
    var upcomingtimes = [];
    var fifteen =["00",15,30,45];

    date = new Date();
    currhour = date.getHours();

    if(currhour <= 11){
      timeType ='AM';
    }
    else{
        timeType = 'PM';
    }
    if(currhour >12) {
      currhour = currhour-12;
    }
    if(currhour === 0){
      currhour = 12;
    }

    currminute = date.getMinutes();

    for(var i = currminute; i => 0; i--  ){
      if(i%15===0){
        closestFifteen = i;
        break;
      }
    }

    fullTime = currhour.toString() + ":" + closestFifteen.toString() + ' ' + timeType;

    for(var i = 0; i<13; i++){
      var temptime = "";

      if(i === currhour){
        for(var j=0; j<4;j++){
          temptime="";
          if(closestFifteen <= fifteen[j]){
            temptime = currhour.toString() + ":" + fifteen[j].toString();
            upcomingtimes.push(temptime);
          }
          else{
            continue;
          }
      }
      }

      if(i > currhour){
        for(var j=0; j<4; j++){
          temptime = i.toString() + ":"+ fifteen[j];
          upcomingtimes.push(temptime);
        }
      }
    }
    console.log(upcomingtimes);

    this.setState({
      time: fullTime
    });
  }

  componentDidMount() {
    this.Clock = setInterval( () => this.getTime(), 1000 );
  }


  render() {

    return(
    <div>
      <Form.Item name="start">
        <Select defaultValue="3:00 PM EST" >
          <Option value={this.state.time} > {this.state.time}</Option>
        </Select>
      </Form.Item>

      <Form.Item name="end">
        <Select />
      </Form.Item>

      </div>

  )
  }
}

export default TimeSelector;
