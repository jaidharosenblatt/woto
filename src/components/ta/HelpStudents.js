import React, { useState, useEffect } from "react";
import { Space, Button } from "antd";
import SearchTable from "../analytics/tables/questionTable/SearchTable";
import { convertHelpData } from "./util/convertHelpData";
import TAInteractionInfo from "../course/tainteraction/TAInteractionInfo";
import LeftRightRow from "../util-components/leftrightrow/LeftRightRow";
import soundfile from "../../static/audio/NotificationAudio.mp3";
import addNotification from "react-push-notification";

import { connect } from "react-redux";
import { finishHelpingStudent } from "../../redux/courses/actions/ta";
import selectors from "../../redux/selectors";
import TitleStat from "../analytics/sessions/TitleStat";
import { SolutionOutlined } from "@ant-design/icons";

const HelpStudents = (props) => {
  const { session, questions, course, activeQuestion } = props;
  const helped = props.stats.helped;
  const [notHelpedData, setNotHelpedData] = useState([]);
  const [helpedData, setHelpedData] = useState([]);
  const [waitTime, setWaitTime] = useState(0);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const notHelped = questions?.filter(
      (item) => item.active && item.description
    );
    const audio = new Audio(soundfile);

    const name = notHelped && notHelped[0]?.student?.name;

    if (!activeQuestion && name && waitTime < 3) {
      setWaitTime(waitTime + 1);
    } else if (activeQuestion) {
      setWaitTime(0);
    }
    
    if (!activeQuestion && name && waitTime > 2) {
      audio.play();
      addNotification({
        title: "A Student Joined the Queue",
        message: `${name} is waiting to be helped`,
        native: true, // when using native, your OS will handle theming.
      });
    }

    setHelpedData(convertHelpData(helped));
    setNotHelpedData(convertHelpData(notHelped));
  }, [questions, activeQuestion, helped, waitTime]);

  const endInteraction = async () => {
    props.finishHelpingStudent();
  };

  return (
    <Space direction="vertical" style={{ width: "100%", padding: 8 }}>
      {activeQuestion && (
        <TAInteractionInfo
          course={course}
          session={session}
          question={activeQuestion}
          endInteraction={endInteraction}
        />
      )}
      <LeftRightRow
        left={
          <TitleStat
            icon={<SolutionOutlined />}
            title="Student Queue"
            color="#40A9FF"
          />
        }
        right={
          props.stats.helped?.length > 0 && (
            <Button onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Active Queue" : "Show Helped Students"}
            </Button>
          )
        }
      />
      <SearchTable help data={showAll ? helpedData : notHelpedData} />
    </Space>
  );
};

const mapStateToProps = (state) => {
  return {
    session: selectors.getSession(state),
    course: selectors.getCourse(state),
    stats: selectors.getStats(state),
    activeQuestion: selectors.getActiveQuestion(state),
    questions: selectors.getQuestions(state),
  };
};

export default connect(mapStateToProps, {
  finishHelpingStudent,
})(HelpStudents);
