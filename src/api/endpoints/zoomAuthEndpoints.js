import client from "../axiosConfig";
import { setZoomToken } from "../tokenService";

export const getZoomOauthUrl = async () => {
  const params = getDevParams();
  let { data } = await client.get("/oauth/authorize/zoom", { params });
  return data;
};

export const authenticateZoomUser = async (code) => {
  const params = getDevParams();
  let { zoomAccessCode } = await client.post("/oauth/zoom", { params });
  setZoomToken(zoomAccessCode);
  return zoomAccessCode;
};

// TODO: Move to general "auth" file
const getDevParams = () => {
  const dev = process.env.NODE_ENV === "development";
  return { dev };
};
