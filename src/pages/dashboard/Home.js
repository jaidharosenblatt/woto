import React from "react";
import { Layout } from "antd";
import "./Home.css";
import AvatarDropdown from "../../components/navbar/AvatarDropdown";

const { Header, Content } = Layout;

const Home = () => {
  return (
    <Layout>
      <Header
        align="right"
        style={{ background: "none", padding: 0, paddingRight: "8px" }}
      >
        <AvatarDropdown showName />
      </Header>
      <Content>
        <div style={{ height: "120vh", backgroundColor: "red" }}>
          I'm an ugly div that allows for scrolling
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
