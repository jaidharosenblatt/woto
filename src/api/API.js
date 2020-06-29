import authEndpoints from "./endpoints/authEndpoints";
import institutionEndpoints from "./endpoints/institutionEndpoints";

export default {
  ...institutionEndpoints,
  ...authEndpoints,
};
