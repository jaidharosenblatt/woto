import { Button, Collapse, Divider, Input, Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import useRosterData from "../../../hooks/useRosterData";

import selectors from "../../../redux/selectors";
import DukeStudentInput from "../../user/addcourse/Form/DukeStudentInput";
import HomeHeader from "../HomeHeader";
import useGeneralKey from "../../../hooks/useGeneralKey";
import LeftRightRow from "../../util-components/leftrightrow/LeftRightRow";
import NavBarCentered from "../../util-components/centeredpage/NavBarCentered";
import InputCopy from "../../util-components/input-copy/InputCopy";

const DukeRoster = (props) => {
  const { studentData, taData } = useRosterData(props.course._id);
  const generalKey = useGeneralKey(props.course._id);

  return (
    <NavBarCentered>
      <HomeHeader
        course={props.course.name}
        page={props.details.title}
        description={props.details.description}
      />
      <Collapse>
        <Collapse.Panel header={`Add a student or teaching assistant`}>
          <LeftRightRow
            left={
              <div>
                <h2>Public Registration Code</h2>
                <p> Allow any student to enroll in {props.course.code}.</p>
              </div>
            }
            right={<InputCopy inputValue={generalKey} inputTitle="Key" />}
          />

          <Divider style={{ flexDirection: "row" }}>
            <h3>OR</h3>
          </Divider>
          <DukeStudentInput />
        </Collapse.Panel>
      </Collapse>
    </NavBarCentered>
  );
};

const mapStateToProps = (state, prevProps) => ({
  ...prevProps,
  course: selectors.getCourse(state),
});
export default connect(mapStateToProps)(DukeRoster);
