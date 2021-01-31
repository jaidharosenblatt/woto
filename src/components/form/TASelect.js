import React, { useEffect } from "react";
import { Select } from "antd";
import { connect } from "react-redux";
import { fetchRoster } from "../../redux/courses/actions/roster";
import selectors from "../../redux/selectors";

const TASelect = (props) => {
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
    <Select placeholder="Teaching Assistant" style={{ width: 200 }}>
      {props.assistants?.map((assistant) => (
        <Select.Option value={assistant._id}> {assistant.name} </Select.Option>
      ))}
    </Select>
  );
};

const mapStateToProps = (state) => ({
  assistants: selectors.getTARoster(state),
});

export default connect(mapStateToProps, { fetchRoster })(TASelect);
