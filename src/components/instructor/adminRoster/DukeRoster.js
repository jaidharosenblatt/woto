import { Collapse } from "antd";
import React from "react";
import { connect } from "react-redux";
import useRosterData from "../../../hooks/useRosterData";
import useGeneralKey from "../../../hooks/useGeneralKey";

import selectors from "../../../redux/selectors";
import DukeStudentInput from "../../user/addcourse/Form/DukeStudentInput";
import HomeHeader from "../HomeHeader";

const DukeRoster = (props) => {
  const { studentData, taData } = useRosterData(props.course._id);
  const generalKey = useGeneralKey(props.course._id);

  console.log(generalKey, studentData, taData);
  return (
    <div>
      <HomeHeader
        course={props.course.name}
        page={props.details.title}
        description={props.details.description}
      />
      <Collapse>
        <Collapse.Panel header={`Add a student or teaching assistant`}>
          <DukeStudentInput />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

const mapStateToProps = (state, prevProps) => ({
  ...prevProps,
  course: selectors.getCourse(state),
});
export default connect(mapStateToProps)(DukeRoster);
