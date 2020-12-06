import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import SideNavBar from "../navbar/SideNavBar";
import AvatarDropdown from "../navbar/AvatarDropdown";
import SignedInRoutes from "../SignedInRoutes";
import UnverifiedAccount from "../../user/verify/UnverifiedAccount";
import VerifyAccount from "../../user/verify/VerifyAccount";

import "./container.css";
import selectors from "../../../redux/selectors";
/**
 * Render navbar and SignedInRoutes within a container
 * @returns {JSX}
 */
const Container = ({ isVerified }) => {
  const [showNav, setShowNav] = useState(false);

  if (!isVerified) {
    return (
      <Switch>
        <Route path="/verify" component={VerifyAccount} />
        <Route component={UnverifiedAccount} />
      </Switch>
    );
  }
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

const mapStateToProps = (state) => {
  return {
    isVerified: selectors.getVerificationStatus(state),
  };
};
export default connect(mapStateToProps)(Container);
