import client from "../AxiosClient";

export async function logIn(user) {
  let { data } = await client.post("/login", user);
  return data[type];
}
