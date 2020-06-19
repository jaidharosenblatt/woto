import React from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";

import Home from "./Home";
import AdminNavBar from "./AdminNavBar";
import AvatarDropdown from "../../components/navbar/AvatarDropdown";

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
    backgroundColor: "rgb(247, 247, 247)",
    padding: "0px",
    paddingRight: "8px",
  },
};

/**
 * @jaidharosenblatt and @kadenrosenblatt Routes admin pages by including
 * side and top navigation and adjusting body acordingly
 */

class AdminContainer extends React.Component {
  state = { courseName: "CS330", dashPage: "At a Glance" };

  onClick = (e, course) => {
    this.setState({ courseName: course, dashPage: e.item.props.title });
  };

  render() {
    return (
      <Layout>
        <Sider width="220" style={styles.adminNavbar}>
          <AdminNavBar onClick={this.onClick} />
        </Sider>
        <div className="AdminContainer">
          <Layout>
            <Header align="right" style={styles.adminProfileBar}>
              <AvatarDropdown showName />
            </Header>
            <div className="AdminBody">
              <Route
                path="/admin"
                component={() => (
                  <Home
                    courseName={this.state.courseName}
                    dashPage={this.state.dashPage}
                  />
                )}
              />
            </div>
          </Layout>
        </div>
      </Layout>
    );
  }
}

export default AdminContainer;
