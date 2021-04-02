import { Button, Space } from "antd";
import React from "react";
import useZoomOauthUrl from "../../../hooks/useOauthUrl";
import { ZoomLogo } from "../../../static/LoadedImages";

/**
 * Button for redirecting to OAuth callback for Zoom
 * @param {String} text to display on button
 * @param {String} userType student or instructor
 */
export default function ZoomAuthButton() {
  const zoomAuthUrl = useZoomOauthUrl();
  return (
    <div>
      <Button
        block
        href={zoomAuthUrl}
        type="primary"
      >
      <Space>
        <ZoomLogo style={{ width: 12, display: "flex" }} />
        Generate
      </Space>
      </Button>
    </div>
  );
}
