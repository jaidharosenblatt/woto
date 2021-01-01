import { Button, Space } from "antd";
import React from "react";
import useOauthUrl from "../../../hooks/useOauthUrl";
import { DukeLogo } from "../../../static/LoadedImages";

/**
 * Button for redirecting to OAuth callback for Duke
 * @param {String} text to display on button
 */
export default function DukeAuthButton({ text }) {
  const oauthUrl = useOauthUrl();

  return (
    <div>
      <Button
        block
        style={{ background: "#012169", borderColor: "#012169" }}
        href={oauthUrl}
        type="primary"
      >
        <Space>
          <DukeLogo style={{ width: 12 }} /> {text}
        </Space>
      </Button>
    </div>
  );
}
