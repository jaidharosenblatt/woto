import React, { useState } from "react";
import { Input, Row, Upload, Button, Col, Space, Tag } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import API from "../../../../api/API";
import "../addcourse.css";
const { TextArea } = Input;

/**
 * @MatthewSclar
 * This is the component that handles all functionality regarding adding students
 * to the course that is currently being created, by the instructor.
 *
 */

const StudentInput = ({ course_id, addedStudents, hideModal }) => {
  const [students, setStudents] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [text, setText] = useState(hideModal ? "Cancel" : "Skip for now");
  const [disabled, setDisabled] = useState(true);

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const onConfirm = async () => {
    hideModal && hideModal();
    var emails = {
      emails: tags,
    };
    console.log("Inviting Emails", tags);
    try {
      const response = await API.inviteEmails(course_id, emails);
      console.log(response);
      addedStudents && addedStudents();
    } catch (e) {
      console.error(e);
    }
  };

  const onChange = ({ target: { value } }) => {
    setDisabled(false);
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
    <div className="add-course-container">
      <Row align="center" gutter={[0, 10]}>
        <h2> Add Students to Your Course</h2>
      </Row>

      <Row gutter={[0, 10]} align="center">
        <Col span={24} align="center">
          <div
            style={{
              width: "100%",
              paddingBottom: "5px",
              maxHeight: "250px",
              overflowY: "auto",
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
          />
        </Col>
      </Row>
      <Row align="center" gutter={[0, 10]}>
        <Space size={2}>
          <p style={{ color: "#ff4d4f" }}>{error}</p>

          <p>{message}</p>
        </Space>
      </Row>
      <Row gutter={4} align="center">
        <Col span={12}>
          <Button
            onClick={onAddTags}
            type="primary"
            htmlType="submit"
            block
            disabled={disabled}
          >
            Add Students
          </Button>
        </Col>
        <Col span={12}>
          <div className="upload-add-students">
            {" "}
            <Upload
              accept=".csv"
              style={{ width: "100%" }}
              beforeUpload={beforeUpload}
              showUploadList={false}
            >
              <Button block>
                <UploadOutlined /> Upload from csv
              </Button>
            </Upload>
          </div>
        </Col>
      </Row>
      <Row align="center">
        <Col span={24}>
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <h3>
              Teaching assistants need to be added as students and promoted in
              course settings
            </h3>
            <Button block type="success" onClick={onConfirm}>
              {text}
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default StudentInput;
