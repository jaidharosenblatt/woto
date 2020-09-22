import React, { useState, useEffect, useContext } from "react";
import { Space, Button } from "antd";
import { AuthContext } from "../../contexts/AuthContext";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import SearchTable from "../../components/Tables/collabtable/SearchTable";
import API from "../../api/API";
import { convertHelpData } from "./util/convertHelpData";
import TAInteractionInfo from "../../components/tacomponents/tainteraction/TAInteractionInfo";
import LeftRightRow from "../../components/leftrightrow/LeftRightRow";

const HelpStudents = ({ session, course }) => {
  const authContext = useContext(AuthContext);
  const [notHelpedData, setNotHelpedData] = useState([]);
  const [helpedData, setHelpedData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [helping, setHelping] = useState();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setLoading(true);
    const res = await API.getQuestions(session._id);
    const helped = res.filter((item) => item.assistant);
    const notHelped = res.filter(
      (item) => !item.assistant && item.active && item.description
    );

    const activeHelping = res.filter(
      (item) => item.assistant?.id === authContext.state.user._id && item.active
    );

    if (activeHelping.length > 0) {
      setHelping(activeHelping[0]);
    }

    const a = convertHelpData(helped);
    const b = convertHelpData(notHelped);

    setHelpedData([...a]);
    setNotHelpedData([...b]);
    setLoading(false);
  };

  function getTitle(state) {
    if (state.userType === "instructor") {
      return "Instructor";
    }
    if ((state.user.gradYear = "Graduate Student")) {
      return "Graduate Teaching Assistant";
    } else {
      return "Undergraduate Teaching Assistant";
    }
  }

  const helpStudent = async (student) => {
    if (student.assistant) {
      setHelping({ ...student, archived: true });
    } else {
      const assistant = {
        id: authContext.state.user._id,
        description: {
          name: authContext.state.user.name.split(" ")[0],
          role: getTitle(authContext.state),
          notifiedAt: new Date(),
          meetingURL: authContext.state.user.meetingURL,
        },
      };
      await API.patchQuestion(student._id, {
        assistant,
      });
      // Since patch response doesn't include student object
      setHelping({ ...student, assistant });
    }
  };

  const endInteraction = async () => {
    const res = await API.patchQuestion(helping._id, {
      active: false,
      assistant: {
        ...helping.assistant,
        description: {
          ...helping.assistant.description,
          endedAt: new Date(),
        },
      },
    });
    console.log(res);
    setHelping(false);
    loadData();
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {helping && (
        <TAInteractionInfo
          course={course}
          session={session}
          question={helping}
          endInteraction={endInteraction}
        />
      )}
      <LeftRightRow
        left={
          <h2>
            Help Students{" "}
            {loading ? (
              <LoadingOutlined />
            ) : (
              <ReloadOutlined onClick={loadData} />
            )}
          </h2>
        }
        right={
          <Button onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Active Queue" : "Show Helped Students"}
          </Button>
        }
      />
      <SearchTable
        help
        helping={helping}
        colParams={{ help: true, helpStudent }}
        data={showAll ? helpedData : notHelpedData}
        course={course}
        loading={loading}
      />
    </Space>
  );
};

export default HelpStudents;