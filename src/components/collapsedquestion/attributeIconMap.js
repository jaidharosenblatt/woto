import React from "react";
import {
  FileOutlined,
  FormOutlined,
  OrderedListOutlined,
  QuestionCircleOutlined,
  TagsOutlined,
  EditOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const attributeIconMap = {
  assignment: { label: "Assignment", icon: <FileOutlined /> },
  problem: { label: "Problem", icon: <FormOutlined /> },
  stage: { label: "Stage", icon: <OrderedListOutlined /> },
  question: { label: "Question", icon: <QuestionCircleOutlined /> },
  concepts: { label: "Concepts", icon: <TagsOutlined /> },
  details: { label: "Details", icon: <EditOutlined /> },
  meetingURL: { label: "Room URL", icon: <VideoCameraOutlined /> },
};

/*Return icon if in keys otherwise return FileOutlined, as not to have random icons
 * for fields be generated everytime a page is reset.
 */
const getIcon = (attribute) => {
  if (attribute in attributeIconMap) {
    return attributeIconMap[attribute];
  } else {
    return { label: attribute, icon: <FileOutlined /> };
  }
};

export default getIcon;
