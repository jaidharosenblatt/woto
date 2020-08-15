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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const res = await API.getStudents(props.course._id);
        console.log(res);
        const students = cleanData([...res.students]);
        const assistants = cleanData([...res.assistants]);

        setStudentData(students);
        setTaData(assistants);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    getData();
  }, [props.course._id]);

  const cleanData = (data) => {
    return data.map((item) => {
      return { key: item._id, ...item };
    });
  };

  const handleDeleteTA = (key) => {
    console.log(key);
  };

  const handleDeleteStudent = (key) => {
    console.log(key);
  };

  return (
    <Col span={24}>
      <HomeHeader
        course={props.course.name}
        page={props.details.title}
        description={props.details.description}
      />

      <StudentRosterTable
        course={props.course}
        loading={loading}
        tableData={studentData}
        removeUser={handleDeleteStudent}
      />

      <TaRosterTable
        loading={loading}
        tableData={taData}
        removeUser={handleDeleteTA}
      />
    </Col>
  );
};

export default Roster;
