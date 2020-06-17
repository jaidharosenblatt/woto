import React from "react";
import "./Home.css";
import ProfileDropdown from "../../components/NavBar/ProfileDropdown";
import { Space, Card, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { Kaden } from "../../static/Images";

// Temporary user TODO replace with network call
const user = {
  name: "Kaden R.",
  profilePic: Kaden,
};

export const AdminProfile = () => {
  return (
    <Dropdown overlay={<ProfileDropdown />} trigger={["click"]}>
      <Card className="AdminProfile">
        <Space>
          <Card style={{ width: 100, border: "none" }}>
            <p style={{ fontWeight: "bold" }}>{user.name}</p>
            <p>Instructor</p>
          </Card>
          <img src={user.profilePic} alt="profile pic" className="profPic" />
        </Space>
      </Card>
    </Dropdown>
  );
};
