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
          <a href="https://drive.google.com/file/d/1iGeMir6-DE7EZobeTWjNA0YciGTUWOUU/view?usp=sharing">
            Privacy Policy
          </a>
          <p>·</p>
          <a href="https://drive.google.com/file/d/1DHgfCC26y0Y6lXrxp-2wyFeZ-fRjVxT5/view?usp=sharing">
            User Guidelines
          </a>
          <p>·</p>
          <a href="https://drive.google.com/file/d/1E04Ma28daKHpRaoNtjhddCQ9JJatiChZ/view?usp=sharing">
            Terms of Use
          </a>
        </Space>
      </Space>
    </div>
  );
};

export default Footer;
