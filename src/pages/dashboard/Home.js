import React from "react";
import "./Home.css";
import ChartCard from "./ChartComponent/ChartCard";
import TripleStatCard from "../../components/instructorData/TripleStatCard"
import StatWithIconCard from "../../components/instructorData/StatWithIconCard"
import { QueueImage, SmileBlackImage, HelpBlackOutline, FrowmBlackOutline } from "../../static/Images";

const getSatisfactionImage = (satRate) => {
  if (satRate >= 70) {
    return SmileBlackImage;
  } else {
    return FrowmBlackOutline;
  }
};

const satisfactionRate = 70



const Home = () => {

  return (
    <div style={{ height: "120%", backgroundColor: "red" }}>
      I'm an ugly div that allows for scrolling
      <TripleStatCard
        satisfactionRate = {`${satisfactionRate}%`}
        satisfactionImage = {getSatisfactionImage(satisfactionRate)}
        studentsSeen = {70}
        notHelped = {5}
      />
      <ChartCard dataList={TABLE_LIST} updateTime="30 minutes"/>
    </div>
  );
};



export default Home;

const TABLE_LIST = [
  { session: "1", min: 10, avg: 30, max: 100 },
  { session: "2", min: 9, avg: 40, max: 110 },
  { session: "3", min: 10, avg: 35, max: 120 },
  { session: "4", min: 7, avg: 30, max: 130 },
  { session: "5", min: 3, avg: 50, max: 120 },
  { session: "6", min: 10, avg: 10, max: 110 },
  { session: "7", min: 10, avg: 20, max: 100 },
  { session: "8", min: 2, avg: 70, max: 90 },
  { session: "9", min: 3, avg: 50, max: 80 },
  { session: "10", min: 10, avg: 30, max: 90 },
  { session: "11", min: 12, avg: 20, max: 100 },
  { session: "12", min: 10, avg: 10, max: 110 },
  { session: "13", min: 9, avg: 20, max: 120 },
  { session: "14", min: 1, avg: 30, max: 130 },
  { session: "15", min: 1, avg: 40, max: 140 },
  { session: "16", min: 15, avg: 50, max: 150 },
  { session: "17", min: 17, avg: 60, max: 140 },
  { session: "18", min: 12, avg: 70, max: 130 },
  { session: "19", min: 10, avg: 80, max: 120 },
  { session: "20", min: 5, avg: 90, max: 110 },
  { session: "21", min: 1, avg: 60, max: 100 },
  { session: "22", min: 2, avg: 50, max: 90 },
  { session: "23", min: 7, avg: 40, max: 80 },
  { session: "24", min: 10, avg: 30, max: 70 },
  { session: "25", min: 12, avg: 20, max: 60 },
  { session: "26", min: 10, avg: 10, max: 70 },
  { session: "27", min: 9, avg: 20, max: 80 },
  { session: "28", min: 3, avg: 30, max: 90 },
  { session: "29", min: 8, avg: 40, max: 100 },
  { session: "30", min: 10, avg: 50, max: 110 },
  { session: "31", min: 10, avg: 60, max: 120 },
];