import React from "react";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";

const StudentsTag = ({ length }) => {
  return (
    <h3>
      {length > 1 ? (
        <>
          <TeamOutlined /> {length} students
        </>
      ) : (
        <>
          <UserOutlined /> 1 student
        </>
      )}
    </h3>
  );
};
export default StudentsTag;
