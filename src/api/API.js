import authEndpoints from "./endpoints/authEndpoints";
import institutionEndpoints from "./endpoints/institutionEndpoints";
import courseEndspoints from "./endpoints/courseEndspoints";
import sessionEndpoints from "./endpoints/sessionEndpoints";
import wotoroomEndpoints from "./endpoints/wotoroomEndpoints";

export default {
  ...institutionEndpoints,
  ...authEndpoints,
  ...courseEndspoints,
  ...sessionEndpoints,
  ...wotoroomEndpoints,
};
