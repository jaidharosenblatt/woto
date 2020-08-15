import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import HomeHeader from "../../HomeHeader";
import TaRosterTable from "../../../../components/Tables/admin-roster/RosterTAs";
import StudentRosterTable from "../../../../components/Tables/admin-roster/RosterStudents";
import API from "../../../../api/API";

/**
 * Allows admin to modify roster
 * @param {details} title ex "at a glance"
 * @param {details} description text to display under title
 * @param {course} name name of course
 * @param {course} institution school ex "duke"
 */
const Roster = (props) => {
  const [studentData, setStudentData] = useState([]);
  const [taData, setTaData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await API.getStudents(props.course._id);
        console.log(res);
        setStudentData([...res.students]);
        setTaData([...res.assistants]);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [props.course._id]);

  const handleDeleteTA = (key) => {
    console.log(key);
  };

  const handleDeleteStudent = (key) => {
    console.log(key);
  };

  return (
    <Col span={24}>
      <Row>
        <Col span={24}>
          {" "}
          <HomeHeader
            course={props.course.name}
            page={props.details.title}
            description={props.details.description}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TaRosterTable tableData={taData} removeUser={handleDeleteTA} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <StudentRosterTable
            course={props.course}
            tableData={studentData}
            removeUser={handleDeleteStudent}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default Roster;
