import React, { useState } from "react";
import { Input, Row, Upload, Button, Col, Space, Tag } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import API from "../../../api/API";
import "../addcourse.css";
const { TextArea } = Input;

/**
 * @MatthewSclar
 * This is the component that handles all functionality regarding adding students
 * to the course that is currently being created, by the instructor.
 *
 */

const StudentInput = ({ course_id, addedStudents }) => {
  const [students, setStudents] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [text, setText] = useState("Skip for now");

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const onConfirm = async () => {
    var emails = {
      emails: tags,
    };
    console.log("Inviting Emails", tags);
    try {
      const response = await API.inviteEmails(course_id, emails);
      console.log(response);
      addedStudents();
    } catch (e) {
      console.error(e);
    }
  };

  const onChange = ({ target: { value } }) => {
    setStudents(value);
  };

  const removeTag = (removedtag) => {
    const newtags = tags.filter((tag) => tag !== removedtag);
    setTags(newtags);
  };

  const onAddTags = () => {
    var temp = students.split(";");
    setText("Confirm");

    if (students !== "") {
      var count = 0;
      temp.forEach((email) => {
        var newtags = tags;
        if (!newtags.includes(email) && validateEmail(email)) {
          count = count + 1;
          newtags.push(email);
          setTags(newtags);
        } else {
          setError("Only nonduplicate and valid emails will be accepted.");
          setMessage("");
        }
      });
    }
    if (count > 0) {
      setMessage(`Added ${count} students.`);
    }
    setStudents("");
  };

  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setStudents(e.target.result);
    };
    reader.readAsText(file);
    return false;
  };

  return (
    <>
      <Row align="center" gutter={[0, 10]}>
        <h2> Add Students to your New Course</h2>
      </Row>

      <Row gutter={[0, 10]} align="center">
        <Col span={24} align="center">
          <div
            style={{
              width: "100%",
              paddingBottom: "5px",
              maxHeight: "250px",
              overflowY: "auto",
              maxWidth: "700px",
            }}
          >
            {tags.map((email) => {
              return (
                <Tag closable onClose={() => removeTag(email)} key={email}>
                  {" "}
                  {email}{" "}
                </Tag>
              );
            })}
          </div>
        </Col>
      </Row>
      <Row gutter={[0, 10]} align="center">
        <Col span={24} align="center">
          <TextArea
            value={students}
            onChange={onChange}
            placeholder="Input Student emails, semicolon delimited. For example: mss91@duke.edu;jrr59@duke.edu;ttl45@duke.edu..."
            autoSize={{ minRows: 3, maxRows: 5 }}
            mode="tag"
            style={{ maxWidth: "600px" }}
          />
        </Col>
      </Row>
      <Row align="center" gutter={[0, 10]}>
        <Space size={2}>
          <p style={{ color: "#ff4d4f" }}>{error}</p>

          <p>{message}</p>
        </Space>
      </Row>
      <Row gutter={[10, 0]} align="center">
        <Space align="center">
          <Button
            onClick={onAddTags}
            type="primary"
            htmlType="submit"
            block
            style={{ minWidth: "200px", width: "100%" }}
          >
            Add Students
          </Button>

          <Upload
            accept=".csv"
            beforeUpload={beforeUpload}
            showUploadList={false}
          >
            <Button block>
              <UploadOutlined /> Upload from csv
            </Button>
          </Upload>
        </Space>
      </Row>
      <Row align="center">
        <Space direction="vertical" size="large">
          <p
            style={{
              color: "#bfbfbf",
              fontSize: "12px",
              position: "relative",
              right: "15px",
            }}
          >
            {" "}
            *Teaching assistants need to be added as students and promoted in
            course settings.{" "}
          </p>

          <Button block type="success" onClick={onConfirm}>
            {text}
          </Button>
        </Space>
      </Row>
    </>
  );
};

export default StudentInput;
