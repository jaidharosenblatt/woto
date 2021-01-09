import { useState, useEffect } from "react";
import API from "../api/API";

/**
 * Get student and ta data from database on refresh of page
 * @param {ObjectId} courseId
 */
const useRosterData = (courseId) => {
  const [studentData, setStudentData] = useState([]);
  const [taData, setTaData] = useState([]);

  const cleanData = (data) => {
    return data.map((item) => {
      return { key: item._id, ...item };
    });
  };

  useEffect(() => {
    async function fetch() {
      const res = await API.getStudents(courseId);
      const students = cleanData([...res.students]);
      const assistants = cleanData([...res.assistants]);

      setStudentData(students);
      setTaData(assistants);
    }
    fetch();
  }, []);
  return { studentData, taData };
};

export default useRosterData;
