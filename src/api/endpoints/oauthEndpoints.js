import client from "../axiosConfig";

/**
 * Get the redirect url for Duke shibboleth
 * @returns {String} url
 */
export const getOauthRedirectUrl = async () => {
  const dev = process.env.NODE_ENV === "development";
  let { data } = await client.get("/oauth/authorize", {
    params: { dev },
  });
  return data;
};
