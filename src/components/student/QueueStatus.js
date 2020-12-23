import React from "react";
import { Card, Space } from "antd";
import { connect } from "react-redux";
import { leaveQueue } from "../../redux/courses/actions/student";

import LeaveQueueButton from "../modals/buttons/LeaveQueueButton";
import WaitQueueStatMiniCards from "./WaitQueueStatMiniCards";
import util from "../../util";
import LocationTimeTag from "../course/header/LocationTimeTag";
import LeftRightRow from "../util-components/leftrightrow/LeftRightRow";
import selectors from "../../redux/selectors";
import TeachingStaffRow from "../course/teaching-staff/TeachingStaffRow";

const QueueStatus = (props) => {
  const { course, session } = props;

  return (
    <div className="help-header">
      <Card
        title={
          <>
            <LeftRightRow
              left={
                <Space direction="vertical">
                  <h1>{course?.code}'s Office Hours</h1>
                  {session && (
                    <LocationTimeTag
                      location={session?.location}
                      time={`${util.convertTimeString(
                        session?.startTime
                      )} - ${util.convertTimeString(session?.endTime)}`}
                    />
                  )}
                </Space>
              }
              right={
                <LeaveQueueButton handleLeave={() => props.leaveQueue()} />
              }
            />
            <TeachingStaffRow staffers={session?.staffers} />
          </>
        }
      >
        <WaitQueueStatMiniCards />
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
    session: selectors.getSession(state),
  };
};

export default connect(mapStateToProps, { leaveQueue })(QueueStatus);

// import React from "react";
// import { Card, Space } from "antd";
// import { connect } from "react-redux";
// import { leaveQueue } from "../../redux/courses/actions/student";
// import QueueInfo from "./QueueInfo";
// import LeaveQueueButton from "../modals/buttons/LeaveQueueButton";
// import WaitQueueStatMiniCards from "./WaitQueueStatMiniCards";
// import util from "../../util";
// import LocationTimeTag from "../course/header/LocationTimeTag";
// import LeftRightRow from "../util-components/leftrightrow/LeftRightRow";
// import selectors from "../../redux/selectors";
// import TeachingStaffRow from "../course/teaching-staff/TeachingStaffRow";

// const QueueStatus = (props) => {
//   const { course, session } = props;
//   const removeComponent = (isTA, component) => {
//     if (isTA) {
//       return null;
//     } else {
//       return component;
//     }
//   };
//   return (
//     <div className="help-header">
//       <LeftRightRow
//         left={
//           <QueueInfo isTA={props.isTA} course={course} session={session} />
//           // <Space direction="vertical">
//           //   <h1>{course?.code}'s Office Hours</h1>
//           //   {session && (
//           //     <LocationTimeTag
//           //       location={session?.location}
//           //       time={`${util.convertTimeString(
//           //         session?.startTime
//           //       )} - ${util.convertTimeString(session?.endTime)}`}
//           //     />
//           //   )}
//           // </Space>
//         }
//         right={
//           props.isTA ? (
//             props.TAButtons
//           ) : (
//             <LeaveQueueButton handleLeave={() => props.leaveQueue()} />
//           )
//         }
//       />
//       {props.isTA && <TeachingStaffRow staffers={session?.staffers} />}

//       {props.isTA && <WaitQueueStatMiniCards />}
//       {/* {removeComponent(props.isTA, <WaitQueueStatMiniCards />)} */}
//       {/* <WaitQueueStatMiniCards /> */}
//     </div>
//   );
// };

// const mapStateToProps = (state, ownProps) => {
//   return {
//     ...ownProps,
//     course: selectors.getCourse(state),
//     session: selectors.getSession(state),
//   };
// };

// export default connect(mapStateToProps, { leaveQueue })(QueueStatus);
