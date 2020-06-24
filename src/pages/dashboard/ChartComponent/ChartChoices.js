import React from "react";
import { Dropdown, Row, Col } from "antd";
import { DownOutlined, CaretDownFilled } from "@ant-design/icons";

const DropdownMenu = ({ onChange, menu, fill }) => {
  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      onChange={onChange}
      
    >
      
        <Row align="middle" >
          <Col align="left">
            <div styles={{padding: "100px"}}>
            <h2>{fill}</h2> 
            </div>
          
          </Col>
          <Col align="right">
          <CaretDownFilled />
          </Col>
       
        </Row>
   
        
      
      
      
      
        
        
      
    </Dropdown>
  );
};

export default DropdownMenu;
// <h2>Wait Time <Dropdown /> </h2>
