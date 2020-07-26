import React from "react";
import { Space } from "antd";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <Space size={2} direction="vertical" align="center">
        <Space size={4}>
          <Link to="/">Woto</Link>
          <p>·</p>
          <Link to="/about">About</Link>
          <p>·</p>
          <Link to="/privacy"> Privacy Policy</Link>
          <p>·</p>
          <Link to="/guidelines"> User Guidelines</Link>
          <p>·</p>
          <Link to="/terms"> Terms of Use</Link>
        </Space>
      </Space>
    </div>
  );
};

export default Footer;
