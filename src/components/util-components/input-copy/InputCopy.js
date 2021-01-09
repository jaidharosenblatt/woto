import React, { useRef, useState } from "react";
import { Space, Input, Button } from "antd";
import { CheckOutlined, LinkOutlined } from "@ant-design/icons";

/**
 * Show an input and button for copying a link
 * @param {String} inputValue the value to display in the input box
 * @param {String} inputTitle the value to display on button
 * @param {Integer} inputWidth set a width for input in pixels
 */
const InputCopy = ({ inputValue, inputTitle, inputWidth }) => {
  const input = useRef(null);
  const [copySuccess, setCopySuccess] = useState(false);
  // used to prevent user from spamming button and having success state stack
  const [copyStarted, setCopyStarted] = useState(false);
  const browserSupportsCopy = document.queryCommandSupported("copy");

  const inputStyle = { width: inputWidth, textAlign: "center" };
  function copyToClipboard() {
    input.current.select();
    document.execCommand("copy");

    setCopySuccess(true);
    if (!copyStarted) {
      setCopyStarted(true);
      setTimeout(() => {
        setCopySuccess(false);
        setCopyStarted(false);
      }, 3000);
    }
  }

  if (!browserSupportsCopy) {
    return <Input style={inputStyle} value={inputValue} />;
  }

  return (
    <Space>
      <Input value={inputValue} style={inputStyle} ref={input} />
      <Button
        style={{ minWidth: 150 }}
        onClick={copyToClipboard}
        type="primary"
      >
        {copySuccess ? <CheckOutlined /> : <LinkOutlined />}
        {copySuccess ? `Copied ${inputTitle}` : `Copy ${inputTitle}`}
      </Button>
    </Space>
  );
};
export default InputCopy;
