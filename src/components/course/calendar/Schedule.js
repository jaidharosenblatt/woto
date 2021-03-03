import React from "react";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
import TitleHeader from "../header/TitleHeader";
import NavBarCentered from "../../util-components/centeredpage/NavBarCentered";
import ActiveSessionAlert from "../announcement/ActiveSessionAlert";
import EventCard from "./EventCard";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {FrownTwoTone } from "@ant-design/icons";
import { Card } from "antd";
import "./schedule.css"; 
import { render } from "@testing-library/react";
import EditSchedule from "./EditScchedule";

/**
 * Schedule for displaying upcoming office hours
 * @param {Object} course active course from redux state
 */


class  Schedule extends React.Component  {

  constructor(props){
    super(props)

    this.state = {
      isAdmin :true,
      showEventCard: true,
      showEditSchedule: false
    }
    this.editDay = this.editDay.bind(this);
    this.saveDay = this.saveDay.bind(this);
  }
  //const { course } = props;
    editDay(){
      this.setState({
        showEventCard: false,
        showEditSchedule: true,
    });}

    saveDay(){
      this.setState({
        showEventCard: true,
        showEditSchedule: false,
    });}
    
render(){

  var day_of_week = new Date().getDay();
  var list = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var sorted_list = list.slice(day_of_week).concat(list.slice(0,day_of_week));
  var sort_events = events.sort((a,b) =>{ return (sorted_list.indexOf(a.dayOfWeek) > sorted_list.indexOf(b.dayOfWeek)) ? 1 : -1; });


  return (
    <div>
 <NavBarCentered>
      <ActiveSessionAlert />
      <TitleHeader
      //${course.code}
        title={`Professor's Schedule`}
        details="View upcoming office hour sessions (currently static data)"
      />
      {this.state.showEventCard ?
        events.length == 0  ?
          <Card type="flex" justify="center" align="middle">
            <FrownTwoTone color = {"blue"} style = {{fontSize: '48px'}} />
            <h1 style = {{margin: "15px"}} >Oops. No data here...</h1> 
            <h3 style = {{margin: "15px"}} >To add a session, press Edit Day</h3> 
          </Card>:
          <Carousel
            showDots={false}
            itemClass="image-item"
            renderDotsOutsider
            responsive={responsive}>
              {sort_events.map((evt, i, prope) => 
                  <div>
                    <EventCard isAdmin = {true} editDay = {this.editDay.bind(this)} key={i} evt={evt} /> 
                  </div>)}
        </Carousel> :
          <EditSchedule saveDay = {this.saveDay.bind(this)}/>
      }
    </NavBarCentered>
    </div>
  );};}
  
const editDay = (props) =>{
}

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
  };
};









const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
const events = [
  {   
    dayOfWeek: "Monday",
    sessions: [ 
    {startTime: "3:30PM", endTime: "4:30PM", assistants: ["Brad Pitt ", "Beth Carrington"]}, 
    {startTime: "5:30PM", endTime: "6:30PM", assistants: ["Jasmine Harris"]}]
    
  },

{
    dayOfWeek: "Tuesday",
    sessions: [ 
    {startTime: "11:00AM", endTime: "12:30PM", assistants: ["Matthew", "Tommy"]}, 
    {startTime: "4:00PM", endTime: "5:30PM", assistants: ["Jasmine"]}]},

    {
      dayOfWeek: "Wednesday",
      sessions: [ 
      {startTime: "3:30PM", endTime: "4:30PM", assistants: ["Jaidha"]}]},
    
      {
        dayOfWeek: "Thursday",
        sessions: [ 
        {startTime: "3:30PM", endTime: "4:30PM", assistants: ["Tommy"]}]},

        {
          dayOfWeek: "Friday",
          sessions: [ 
          {startTime: "3:30PM", endTime: "4:30PM", assistants: ["Jaidha"]}]},
        
          {
            dayOfWeek: "Saturday",
            sessions: [ 
            {startTime: "3:30PM", endTime: "4:30PM", assistants: ["Jaidha"]}]},

            {
              dayOfWeek: "Sunday",
              sessions: [ 
              {startTime: "3:30PM", endTime: "4:30PM", assistants: ["Tommy"]}]}
                
    ]
     
  
export default connect(mapStateToProps)(Schedule);
