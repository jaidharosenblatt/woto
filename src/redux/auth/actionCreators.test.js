import moxios from "moxios";

import { storeFactory, setupFakeToken } from "../../../test/testUtils";
import selectors from "../selectors";
import actions from "./actionCreators";
import axiosConfig from "../../api/axiosConfig";

describe("auth action creator", () => {
  beforeEach(() => {
    moxios.install(axiosConfig);
    setupFakeToken();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("loadUser adds user to state", () => {
    const user = { name: "Jaidha" };
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: user,
      });
    });

    return store.dispatch(actions.loadUser()).then(() => {
      const newUser = selectors.getUser(store.getState());
      expect(newUser).toBe(user);
    });
  });
});
