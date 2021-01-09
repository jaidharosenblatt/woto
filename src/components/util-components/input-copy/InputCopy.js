import React, { useRef, useState } from "react";
import { Space, Input, Button } from "antd";
import { CheckOutlined, LinkOutlined } from "@ant-design/icons";

/**
 * Show an input and button for copying a link
 * @param {String} inputValue the value to display in the input box
 * @param {String} inputTitle the value to display on button
 */
const InputCopy = ({ inputValue, inputTitle }) => {
  const input = useRef(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyStarted, setCopyStarted] = useState(false);

  function copyToClipboard(e) {
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

  const browserSupportsCopy = document.queryCommandSupported("copy");

  if (!browserSupportsCopy) {
    return <Input value={inputValue} />;
  }

  return (
    <Space>
      <Input value={inputValue} ref={input} />
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
