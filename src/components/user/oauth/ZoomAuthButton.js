import { Button, Space } from "antd";
import React from "react";
import { useZoomOauthUrl } from "../../../hooks/useOauthUrl";
import { ZoomLogo } from "../../../static/LoadedImages";
import Cookie from "js-cookie";

/**
 * Button for redirecting to OAuth callback for Zoom
 * @param {String} text to display on button
 * @param {String} userType student or instructor
 */
export default function ZoomAuthButton() {
  //TODO: Conditional rendering, if a token is in cookies use it.
  const zoomAuthUrl = useZoomOauthUrl();
  var accessToken = Cookie.get("zoomToken");
  var url = accessToken == "" ? zoomAuthUrl : accessToken;
  return (
    <div>
      <Button
        block
        href={zoomAuthUrl}
        type="primary"
        target="_blank"
      >
      <Space>
        <ZoomLogo style={{ width: 12, display: "flex" }} />
        Generate
      </Space>
      </Button>
    </div>
  );
}
