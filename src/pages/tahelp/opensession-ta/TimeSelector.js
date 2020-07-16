import React from 'react';
import {Select, Form, Space} from 'antd';
const {Option}  = Select;
/**
 * @MatthewSclar Component used for a time selector
 * Used on OpenSessionPage
 *This component displays two Select form items with names start and ends
 *that contain options from the nearest 15 minute interval time till
 *the end of the day with 15 minute interval step.
 *
 *Ex. If current time = 1:37 PM
 *Select will have options starting at 1:30, 1:45, 2:00, 2:15... until 11:45 PM
 */


class TimeSelector extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      time: '',
      upcomingtimes:[]
    };
  }

 getTime = () =>{
    var date,currhour, currminute, timeType, fullTime;
    var closestFifteen = 0;
    var upcomingtimes = [];
    var pmTimes=["12:00 PM","12:15 PM","12:30 PM","12:45 PM",
                "1:00 PM","1:15 PM","1:30 PM","1:45 PM",
                "2:00 PM","2:15 PM","2:30 PM","2:45 PM",
                "3:00 PM","3:15 PM","3:30 PM","3:45 PM",
                "4:00 PM","4:15 PM","4:30 PM","4:45 PM",
                "5:00 PM","5:15 PM","5:30 PM","5:45 PM",
                "6:00 PM","6:15 PM","6:30 PM","6:45 PM",
                "7:00 PM","7:15 PM","7:30 PM","7:45 PM",
                "8:00 PM","8:15 PM","8:30 PM","8:45 PM",
                "9:00 PM","9:15 PM","9:30 PM","9:45 PM",
                "10:00 PM","10:15 PM","10:30 PM","10:45 PM",
                "11:00 PM","11:15 PM","11:30 PM","11:45 PM"]
    var fifteen =["00",15,30,45];

    date = new Date();
    currhour = date.getHours();

    if(currhour <= 11){
      timeType ='AM';
    }
    else{
        timeType = 'PM';
    }
    if(currhour > 12) {
      currhour = currhour-12;
    }
    if(currhour === 0){
      currhour = 12;
    }

    currminute = date.getMinutes();

    for(var i = currminute; i => 0; i--  ){
      if(i%15===0){
        if(i===0){
          closestFifteen = "00";
          break
        }
        closestFifteen = i;
        break;
      }
    }

    var nexthour = currhour + 1;
    if(nexthour === 13){
      nexthour = 1;
    }

    fullTime = currhour.toString() + ":" + closestFifteen.toString() + ' ' + timeType;
    var nextTime = nexthour.toString() + ":" + closestFifteen.toString() + ' ' + timeType;

    this.setState({
      time: fullTime
    });

    this.props.timeCallBack(fullTime, nextTime);

    if(currhour === 12){
        var temptime = "";
          for(var j=0; j<4;j++){
            temptime = "";
            if(closestFifteen <= fifteen[j]){
              temptime = currhour.toString() + ":" + fifteen[j].toString()+ ' ' + timeType;
              upcomingtimes.push(temptime);
            }
          }
      }

      for( i = 1; i<12; i++){
        temptime = "";
        if(i === currhour){
          for( j=0; j<4;j++){
            temptime = "";
            if(closestFifteen <= fifteen[j]){
              temptime = currhour.toString() + ":" + fifteen[j].toString()+ ' ' + timeType;
              upcomingtimes.push(temptime);
            }
            else{
              continue;
            }
          }
        }

        if(i > currhour || currhour === 12){
          for(j=0; j<4; j++){
            temptime = i.toString() + ":"+ fifteen[j] + ' ' + timeType;
            upcomingtimes.push(temptime);
          }
        }
      }

    if(timeType==='AM'){
       upcomingtimes = upcomingtimes.concat(pmTimes);
     }

     this.setState({
       upcomingtimes: upcomingtimes
     });
  }

  componentDidMount(){
    setTimeout(() => this.getTime(), 0);
  }

  render() {
    var options=[]
    var upcomingtimes = this.state.upcomingtimes;

    upcomingtimes.forEach((time, key) =>{
      options.push(
        <Option key={time} value= {time}> {time} </Option>
      );
    });


    return(

        <Space>
          <Form.Item  >
            <Select
              showSearch
              onChange = { (value) => this.props.setStart(value)}
              value = {this.props.start}
              disabled={this.props.disabled}
              style={{width:"107px"}}>
                {options}
            </Select>
          </Form.Item>
          <p style={{position:"relative", bottom:"10px"}}>-</p>
          <Form.Item  >
            <Select showSearch
              onChange = { (value) => this.props.setEnd(value)}
              value={this.props.end}
              disabled={this.props.disabled}
              style={{width:"107px"}}>
                {options}
            </Select>
          </Form.Item>
        </Space>

  )
  }
}

export default TimeSelector;