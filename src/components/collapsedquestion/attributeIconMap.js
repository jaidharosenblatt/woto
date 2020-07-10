import React from "react";
import {
  FileOutlined,
  FormOutlined,
  OrderedListOutlined,
  QuestionCircleOutlined,
  TagsOutlined,
  EditOutlined
} from "@ant-design/icons";

const attributeIconMap = {
  assignment: <FileOutlined />,
  problem: <FormOutlined />,
  stage: <OrderedListOutlined />,
  question: <QuestionCircleOutlined />,
  concepts: <TagsOutlined />,
  details: <EditOutlined />
};

//Return icon if in keys otherwise return FileOutlined
const getIcon = (attribute) => {
  if (attribute in attributeIconMap) {
    return attributeIconMap[attribute];
  } else {
    return <FileOutlined />;
  }
};

export default getIcon;
