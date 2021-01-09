import React from "react";
import { connect } from "react-redux";
import useRosterData from "../../../hooks/useRosterData";

import selectors from "../../../redux/selectors";
import DukeStudentInput from "../../user/addcourse/Form/DukeStudentInput";
import HomeHeader from "../HomeHeader";
import useGeneralKey from "../../../hooks/useGeneralKey";
import NavBarCentered from "../../util-components/centeredpage/NavBarCentered";
import InputCopy from "../../util-components/input-copy/InputCopy";
import VerticalSpace from "../../util-components/vertical-space/VerticalSpace";

const DukeRoster = (props) => {
  const { studentData, taData } = useRosterData(props.course._id);
  const generalKey = useGeneralKey(props.course._id);

  return (
    <NavBarCentered>
      <VerticalSpace>
        <HomeHeader
          course={props.course.name}
          page={props.details.title}
          description={props.details.description}
        />

        <div>
          <p>Public Course Code</p>
          <h3>Anyone can enroll in {props.course.code} using the code below</h3>
          <InputCopy
            inputWidth={80}
            inputValue={generalKey}
            inputTitle="Code"
          />
        </div>
        {/* <div>
          <p>Add a Student or Teaching Assistant</p>
          <DukeStudentInput />
        </div> */}
      </VerticalSpace>
    </NavBarCentered>
  );
};

const mapStateToProps = (state, prevProps) => ({
  ...prevProps,
  course: selectors.getCourse(state),
});
export default connect(mapStateToProps)(DukeRoster);
