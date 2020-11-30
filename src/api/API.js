import authEndpoints from "./endpoints/authEndpoints";
import institutionEndpoints from "./endpoints/institutionEndpoints";
import courseEndpoints from "./endpoints/courseEndpoints";
import sessionEndpoints from "./endpoints/sessionEndpoints";
import adminEndpoints from "./endpoints/adminEndpoints";
import discussionEndpoints from "./endpoints/discussionEndpoints";

export default {
  ...institutionEndpoints,
  ...authEndpoints,
  ...courseEndpoints,
  ...sessionEndpoints,
  ...adminEndpoints,
  ...discussionEndpoints,
};
