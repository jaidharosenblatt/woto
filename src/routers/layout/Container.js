import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";

import SideNavBar from "./SideNavBar";
import AvatarDropdown from "../../components/navbar/AvatarDropdown";
import SignedInRoutes from "../SignedInRoutes";
import "./container.css";

/**
 * Render navbar and SignedInRoutes within a container
 * @returns {JSX}
 */
const Container = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div>
      <div
        className="mobile-navbar-wrapper"
        style={{ width: showNav ? "260px" : "0px" }}
      >
        <SideNavBar />

        <div
          className="collapse-controller"
          onClick={() => setShowNav(!showNav)}
        >
          <MenuOutlined />
        </div>
      </div>

      <div className="desktop-navbar-wrapper">
        <SideNavBar />
      </div>

      <div className="admin">
        <div className="admin-navbar-wrapper">
          <AvatarDropdown showName />
        </div>
        <div className="admin-body">
          <SignedInRoutes />
        </div>
      </div>
    </div>
  );
};

export default Container;
