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
    backgroundColor: "white",
    padding: "0px",
    paddingRight: "8px",
  },
};

/**
 * @jaidharosenblatt Routes admin pages by including
 * side and top navigation and adjusting body acordingly
 */

class AdminContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { courseName: "CS330", dashPage: 0 };
  }
  handleClick = (e) => {
    this.setState({ courseName: e.key });
    console.log(this.state);
  };

  render() {
    return (
      <Layout>
        <Sider width="220" style={styles.adminNavbar}>
          <AdminNavBar handleClick={this.handleClick} />
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
