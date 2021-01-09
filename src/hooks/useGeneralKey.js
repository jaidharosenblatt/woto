import { useState, useEffect } from "react";
import API from "../api/API";

/**
 * Get this course's general key
 * @param {ObjectId} courseId
 */
const useGeneralKey = (courseId) => {
  const [courseKey, setCourseKey] = useState();
  useEffect(() => {
    async function fetchKey() {
      try {
        const { key } = await API.getGeneralKey(courseId);
        setCourseKey(key);
      } catch (error) {
        console.log(error);
      }
    }

    fetchKey();
  }, [courseId]);

  return courseKey;
};

export default useGeneralKey;
