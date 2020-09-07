import React, { useState, useEffect, useCallback } from "react";
import { Col, Space, Tooltip, Row } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
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
  const [courseKey, setCourseKey] = useState("");

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
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

  useEffect(() => {
    async function fetchKey() {
      try {
        const response = await API.getGeneralKey(props.course._id);
        console.log(response);
        setCourseKey(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchKey();
  }, [props.course]);

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
      <Row>
        <Col xs={24} lg={12}>
          <HomeHeader
            course={props.course.name}
            page={props.details.title}
            description={props.details.description}
          />
        </Col>
        <Col xs={24} lg={12} align="right">
          <p style={{ paddingRight: "20px", paddingTop: "30px" }}>
            <b>General Student Key:</b> {courseKey.key}{" "}
            <Tooltip title="Share this key with your students to allow them join your course.">
              <QuestionCircleOutlined style={{ cursor: "pointer" }} />
            </Tooltip>
          </p>
        </Col>
      </Row>
      <Space style={{ width: "100%" }} direction="vertical" size="large">
        <StudentRosterTable
          {...tableProps}
          tableData={studentData}
          handleDelete={handleDeleteStudent}
        />
        <TaRosterTable
          {...tableProps}
          tableData={taData}
          handleDelete={handleDeleteTA}
        />
      </Space>
    </Col>
  );
};

export default Roster;
