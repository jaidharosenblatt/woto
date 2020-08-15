import React, { useState, useEffect, useCallback } from "react";
import { Col, Space } from "antd";
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

  const loadData = useCallback(async () => {
    try {
      const res = await API.getStudents(props.course._id);
      console.log(res);
      const students = cleanData([...res.students]);
      // const assistants = cleanData([...res.students]);

      const assistants = cleanData([...res.assistants]);

      setStudentData(students);
      setTaData(assistants);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [props.course._id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  const tableProps = {
    loadData,
    loading,
    course: props.course,
  };

  return (
    <Col span={24}>
      <Space style={{ width: "100%" }} direction="vertical" size="large">
        <HomeHeader
          course={props.course.name}
          page={props.details.title}
          description={props.details.description}
        />
        <StudentRosterTable
          {...tableProps}
          tableData={studentData}
          handleDelete={handleDeleteStudent}
        />
        <TaRosterTable
          {...tableProps}
          loading={loading}
          tableData={taData}
          handleDelete={handleDeleteTA}
        />
      </Space>
    </Col>
  );
};

export default Roster;
