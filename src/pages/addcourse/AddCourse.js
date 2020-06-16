import React from "react";
import { Col, Layout } from "antd";

import AddCourseForm from "./Form/AddCourseForm";
import "./addcourse.css";

const styles = {
  imageCard: { backgroundColor: "#F4FBFF" },
  form: { backgroundColor: "white" },
};
const { Content, Sider } = Layout;
/**
 * @MatthewSclar Page for students to add courses.
 * uses: AddCourseForm component
 */

const AddCourse = () => {
  return (
    <Layout>
      <Col xs={0} md={10}>
        <Content style={styles.imageCard}>
          <div className="AddCourseImageCard" />
        </Content>
      </Col>
      <Col xs={24} md={14}>
        <Sider style={styles.form} width="100%">
          <AddCourseForm />
        </Sider>
      </Col>
    </Layout>
  );
};

export default AddCourse;
