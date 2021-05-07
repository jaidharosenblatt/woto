import { useState, useEffect } from "react";
import API from "../api/API";

export const useZoomAccessToken = () => {
  const [url, setUrl] = useState();

  useEffect(() => {
    async function getUrl() {
      let res;
      res = await API.getZoomOauthUrl();
      setUrl(res);
    }
    getUrl();
  });
  return url;
}
