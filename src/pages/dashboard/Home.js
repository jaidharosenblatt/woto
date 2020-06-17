import React from "react";
import { Layout, Card } from "antd";
import {} from "@ant-design/icons";
import "./Home.css";
import AdminNavBar from "./AdminNavBar";
import { AdminProfile } from "./AdminProfile";

const { Header, Content, Footer, Sider } = Layout;

const Home = () => {
  return (
    <Layout className="site-layout">
      <Sider style={{ width: "100%" }}>
        <AdminNavBar />
      </Sider>
      <Layout>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <AdminProfile />
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          >
            ...
            <br />
            Really
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            long
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            content
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
