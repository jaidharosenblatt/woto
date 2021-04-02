import authEndpoints from "./endpoints/authEndpoints";
import institutionEndpoints from "./endpoints/institutionEndpoints";
import courseEndpoints from "./endpoints/courseEndpoints";
import * as sessionEndpoints from "./endpoints/sessionEndpoints";
import adminEndpoints from "./endpoints/adminEndpoints";
import discussionEndpoints from "./endpoints/discussionEndpoints";
import * as oauthEndpoints from "./endpoints/oauthEndpoints";
import * as zoomOauthEndpoints from "./endpoints/zoomAuthEndpoints";
import * as dashboardEndpoints from "./endpoints/dashboardEndpoints";

export default {
  ...institutionEndpoints,
  ...authEndpoints,
  ...courseEndpoints,
  ...sessionEndpoints,
  ...adminEndpoints,
  ...discussionEndpoints,
  ...oauthEndpoints,
  ...dashboardEndpoints,
  ...zoomOauthEndpoints
};
