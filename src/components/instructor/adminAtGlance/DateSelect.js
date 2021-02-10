import { DatePicker } from "antd";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import {
  setDashboardEndDate,
  setDashboardStartDate,
  loadHome,
} from "../../../redux/dashboard/actionCreators";
import selectors from "../../../redux/selectors";

const DateSelect = (props) => {
  function disabledDate(current) {
    // Can not select days after today
    return current > moment().endOf("day");
  }

  function handleChange(range) {
    if (!range || range.length === 0) {
      return;
    }
    props.setDashboardStartDate(range[0]);
    props.setDashboardEndDate(range[1]);
    props.loadHome();
  }

  return (
    <DatePicker.RangePicker
      format="ll"
      onCalendarChange={handleChange}
      defaultValue={[props.startDate, props.endDate]}
      disabledDate={disabledDate}
    />
  );
};

const mapStateToProps = (state) => ({
  startDate: selectors.getDashboardStartDate(state),
  endDate: selectors.getDashboardEndDate(state),
});
export default connect(mapStateToProps, {
  setDashboardStartDate,
  setDashboardEndDate,
  loadHome,
})(DateSelect);
