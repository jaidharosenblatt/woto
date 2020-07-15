import authEndpoints from "./endpoints/authEndpoints";
import institutionEndpoints from "./endpoints/institutionEndpoints";
import courseEndspoints from "./endpoints/courseEndspoints";
import sessionEndpoints from "./endpoints/sessionEndpoints";

export default {
  ...institutionEndpoints,
  ...authEndpoints,
  ...courseEndspoints,
  ...sessionEndpoints,
};
