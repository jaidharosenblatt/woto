import React from "react";
import HomeHeader from "../HomeHeader";
import CourseSettingsForm from "./form/CourseSettingsForm";
import VerticalSpace from "../../util-components/vertical-space/VerticalSpace";
import PageCard from "../../util-components/centeredpage/PageCard";

/**
 * Allows admin to change course specific settings
 * @param {details} title ex "at a glance"
 * @param {details} description text to display under title
 * @param {course} name name of course
 * @param {course} institution school ex "duke"
 */
const CourseSettings = (props) => {
  return (
    <PageCard navbar>
      <VerticalSpace>
        <HomeHeader
          course={props.course.name}
          page={props.details.title}
          description={props.details.description}
        />
        <CourseSettingsForm course={props.course} />
        {/* <CustomizeQuestion course={props.course} /> */}
      </VerticalSpace>
    </PageCard>
  );
};

export default CourseSettings;
