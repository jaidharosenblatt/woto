import { useState, useEffect } from "react";
import API from "../api/API";

/**
 * Get the Oauth url for a certain userType
 * @param userType student or instructor
 * @returns {URL} from Oauth
 */
const useOauthUrl = (userType) => {
  const [url, setUrl] = useState();

  useEffect(() => {
    async function getUrl() {
      let res;
      if (userType === "instructor") {
        res = await API.getOauthRedirectUrlInstructor();
      } else {
        res = await API.getOauthRedirectUrlStudent();
      }

      setUrl(res);
    }
    getUrl();
  }, [userType]);
  return url;
};

export default useOauthUrl;
