import { Button, Space } from "antd";
import React from "react";
import useOauthUrl from "../../../hooks/useOauthUrl";
import { DukeLogo } from "../../../static/LoadedImages";

export default function DukeAuthButton() {
  const oauthUrl = useOauthUrl();

  return (
    <div>
      <Button
        style={{ background: "#012169", borderColor: "#012169" }}
        href={oauthUrl}
        type="primary"
      >
        <Space>
          <DukeLogo style={{ width: 12 }} /> Login with Duke Shibboleth
        </Space>
      </Button>
    </div>
  );
}
