import React from "react";
import { Col, Layout } from "antd";

import AddCourseForm from "./Form/AddCourseForm";
import './AddCourse.css';

const { Content, Sider } = Layout;
/**
 * @MatthewSclar Page for students to add courses.
 *Uses: AddCourseForm component
 */

const AddCourse = () => {
  return (
    <Layout>
      <Col xs={0} md={10}>
        <Content style={{ backgroundColor: "#F4FBFF" }}>
          <div className="AddCourseImageCard" />
        </Content>
      </Col>
      <Col xs={24} md={14}>
        <Sider style={{ backgroundColor: "white" }} width="100%">
          <AddCourseForm />
        </Sider>
      </Col>
    </Layout>

  );
};

export default AddCourse;
