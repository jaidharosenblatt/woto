import React from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";

import Dashboard from "./Home";
import AdminNavBar from "./AdminNavBar";
import AvatarDropdown from "../../components/NavBar/AvatarDropdown";

const { Sider, Header } = Layout;

const styles = {
  adminNavbar: {
    position: "fixed",
    zIndex: 1,
    height: "100vh",
    backgroundColor: "#F4FBFF",
    padding: "0px",
  },
  adminProfileBar: {
    position: "fixed",
    zIndex: 1,
    height: "68px",
    width: "calc(100vw - 220px)",
    backgroundColor: "white",
    padding: "0px",
    paddingRight: "8px",
  },
};

/**
 * @jaidharosenblatt Routes admin pages by including
 * side and top navigation and adjusting body acordingly
 */
const AdminContainer = () => {
  return (
    <Layout>
      <Sider width="220" style={styles.adminNavbar}>
        <AdminNavBar />
      </Sider>

      <div className="AdminContainer">
        <Layout>
          <Header align="right" style={styles.adminProfileBar}>
            <AvatarDropdown showName />
          </Header>
          <div className="AdminBody">
            <Route path="/admin" component={Dashboard} />
          </div>
        </Layout>
      </div>
    </Layout>
  );
};

export default AdminContainer;
