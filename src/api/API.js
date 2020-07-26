import authEndpoints from "./endpoints/authEndpoints";
import institutionEndpoints from "./endpoints/institutionEndpoints";
import courseEndspoints from "./endpoints/courseEndspoints";
import sessionEndpoints from "./endpoints/sessionEndpoints";
import adminEndpoints from "./endpoints/adminEndpoints"
import wotoroomEndpoints from "./endpoints/wotoroomEndpoints";

export default {
  ...institutionEndpoints,
  ...authEndpoints,
  ...courseEndspoints,
  ...sessionEndpoints,
  ...adminEndpoints,
  ...wotoroomEndpoints,
};
