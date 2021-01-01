import { useState, useEffect } from "react";
import API from "../api/API";

/**
 * Get location of the current user
 * @returns {Location} matching backend model
 */
const useOauthUrl = () => {
  const [url, setUrl] = useState();

  useEffect(() => {
    async function getUrl() {
      const res = await API.getOauthRedirectUrl();
      setUrl(res);
    }
    getUrl();
  }, []);
  return url;
};

export default useOauthUrl;
