import React, { useState, useEffect } from "react";
import { Space, Button } from "antd";
import SearchTable from "../analytics/tables/questionTable/SearchTable";
import { convertHelpData } from "./util/convertHelpData";
import TAInteractionInfo from "../course/tainteraction/TAInteractionInfo";
import LeftRightRow from "../util-components/leftrightrow/LeftRightRow";

import { connect } from "react-redux";
import { finishHelpingStudent } from "../../redux/courses/actions/ta";
import selectors from "../../redux/selectors";
import TitleStat from "../analytics/sessions/TitleStat";
import { SolutionOutlined } from "@ant-design/icons";

const HelpStudents = (props) => {
  const { session, questions, course, activeQuestion } = props;
  const [notHelpedData, setNotHelpedData] = useState([]);
  const [helpedData, setHelpedData] = useState([]);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const loadData = async () => {
    let helped = [];
    let notHelped = [];

    if (questions) {
      helped = questions.filter((item) => item.assistant);
      notHelped = questions.filter(
        (item) => !item.assistant && item.active && item.description
      );
    }

    const a = convertHelpData(helped);
    const b = convertHelpData(notHelped);

    setHelpedData([...a]);
    setNotHelpedData([...b]);
  };

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
          props.stats.helped > 0 && (
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
