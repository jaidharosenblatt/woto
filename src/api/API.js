import authEndpoints from "./endpoints/authEndpoints";
import institutionEndpoints from "./endpoints/institutionEndpoints";
import courseEndspoints from "./endpoints/courseEndspoints";

export default {
  ...institutionEndpoints,
  ...authEndpoints,
  ...courseEndspoints,
};
