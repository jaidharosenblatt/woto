import axios from "axios";

const client = axios.create({
  baseURL: "https://woto.herokuapp.com/",
  headers: { "Access-Control-Allow-Origin": "*" },
});

export default client;
