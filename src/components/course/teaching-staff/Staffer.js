import React from "react";

import { Space, Avatar } from "antd";
import { DefaultProfile } from "../../../static/Images";
import util from "../../../util";

const Staffer = ({ staffer, i }) => {
  return (
    <Space style={{ marginTop: 8 }} key={i}>
      <Avatar src={staffer.avatar || DefaultProfile} />
      <div>
        <p>{staffer.name || `Assistant ${i + 1}`}</p>
        <h3>{util.getTitle(staffer.gradYear)}</h3>
      </div>
    </Space>
  );
};

export default Staffer;
