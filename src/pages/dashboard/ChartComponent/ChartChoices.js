import React from "react";
import { Dropdown } from "antd";
import { CaretDownFilled } from "@ant-design/icons";

const DropdownMenu = ({ onChange, menu, fill }) => {
  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      style={{ padding: "5px" }}
      onChange={onChange}
    >
      
        <h2>{fill} <CaretDownFilled /></h2> 
      
    </Dropdown>
  );
};

export default DropdownMenu;
// <h2>Wait Time <Dropdown /> </h2>
