import React from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";

import AdminNavBar from "./AdminNavBar";
import AvatarDropdown from "../../components/navbar/AvatarDropdown";
import PageDetailMap from "./PageDetailMap";

const { Sider, Header, Content } = Layout;

const styles = {
  adminNavbar: {
   
    zIndex: 1,
    height: "100%",
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

const courses = {
  cs330: { name: "CS330", institution: "duke", role: "admin" },
  cs250: { name: "CS250", institution: "duke", role: "admin" },
  cs101: { name: "CS101", institution: "duke", role: "admin" },
};

const courseKeys = Object.keys(courses);
const pageKeys = Object.keys(PageDetailMap);

const pages = [];
for (let i = 0; i < courseKeys.length; i++) {
  for (let j = 0; j < pageKeys.length; j++) {
    let Page = PageDetailMap[pageKeys[j]].page;
    console.log(Page);
    pages.push(
      <Route
        exact
        key={`${courseKeys[i]}/${pageKeys[j]}`}
        path={`/admin/${courseKeys[i]}/${pageKeys[j]}`}
        component={() => {
          return (
            <Page
              course={courses[courseKeys[i]]}
              details={PageDetailMap[pageKeys[j]]}
            />
          );
        }}
      />
    );
  }
}

class AdminContainer extends React.Component {
  state = { courseName: "CS330", dashPage: "At a Glance" };

  onClick = (e, course) => {
    this.setState({ courseName: course, dashPage: e.item.props.title });
  };

  render() {
    return (
      
      <Layout>
        <Sider
          width="220"
          style={styles.adminNavbar}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <AdminNavBar courses={courses} onClick={this.onClick} />
        </Sider>
        
          <Layout>
            <Header align="right" style={styles.adminProfileBar}>
              <AvatarDropdown showName />
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
            <div className="AdminBody">{pages}</div>
            </Content>
           
          </Layout>
        
      </Layout>
    );
  }
}

export default AdminContainer;
