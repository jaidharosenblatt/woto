import React, { useEffect } from "react";
import { connect } from "react-redux";

import selectors from "../../../redux/selectors";
import HomeHeader from "../HomeHeader";
import NavBarCentered from "../../util-components/centeredpage/NavBarCentered";
// import InputCopy from "../../util-components/input-copy/InputCopy";
import StudentTARoster from "./StudentTARoster";
import VerticalSpace from "../../util-components/vertical-space/VerticalSpace";
import { fetchRoster } from "../../../redux/courses/actions/roster";
import CSVUploadDrop from "./CSVUploadDrop";
import CSVUploadButton from "./CSVUploadButton";

const DukeRoster = (props) => {
  const { taRoster, studentRoster } = props;
  const _fetchRoster = props.fetchRoster;

  const unfilledRoster = taRoster?.length === 0 || studentRoster?.length === 0;

  useEffect(() => {
    async function fetch() {
      await _fetchRoster();
    }
    // only fetch if data is null
    if (!taRoster) {
      fetch();
    }
  }, [_fetchRoster, taRoster]);

  return (
    <NavBarCentered>
      <VerticalSpace>
        <HomeHeader
          course={props.course.name}
          page={props.details.title}
          description={props.details.description}
        />

        {unfilledRoster ? <CSVUploadDrop /> : <CSVUploadButton />}

        <StudentTARoster isStudent title="Students" />
        <StudentTARoster title="Teaching Assistants" />
      </VerticalSpace>
    </NavBarCentered>
  );
};

const mapStateToProps = (state, prevProps) => ({
  ...prevProps,
  course: selectors.getCourse(state),
  taRoster: selectors.getTARoster(state),
  studentRoster: selectors.getStudentRoster(state),
});
export default connect(mapStateToProps, { fetchRoster })(DukeRoster);
