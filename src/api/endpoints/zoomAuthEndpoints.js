import client from "../axiosConfig";


export const getZoomOauthUrl = async () => {
  const params = getDevParams();
  let { data } = await client.get("/oauth/authorize/zoom", { params });
  return data;
};

export async function authenticateZoomUser(user) {
  const params = getDevParams();
  let { token } = await client.post("/oauth/zoom", { params });
  return token;
}

// TODO: Move to general "auth" file
const getDevParams = () => {
  const dev = process.env.NODE_ENV === "development";
  return { dev };
};
