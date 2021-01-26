import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchRoster } from "../../../redux/courses/actions/roster";
import selectors from "../../../redux/selectors";
import ScheduleTimeSelector from "./ScheduleTimeSelector";

const Schedule = (props) => {
  const { assistants } = props;
  const _fetchRoster = props.fetchRoster;

  useEffect(() => {
    async function fetch() {
      await _fetchRoster();
    }
    // only fetch if data is null
    if (!assistants) {
      fetch();
    }
  }, [_fetchRoster, assistants]);

  return (
    <div>
      <h2>Assistants</h2>
      {assistants?.map((assistant, i) => (
        <p key={i}>{assistant.name}</p>
      ))}
      Jasmine - put code here <ScheduleTimeSelector />
    </div>
  );
};

const mapStateToProps = (state) => ({
  assistants: selectors.getTARoster(state),
});
export default connect(mapStateToProps, { fetchRoster })(Schedule);
