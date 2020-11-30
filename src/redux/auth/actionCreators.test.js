import moxios from "moxios";

import { storeFactory } from "../../../test/testUtils";
import actions from "./actionCreators";

describe("auth action creator", () => {
  beforeEach(() => {
    moxios.install();
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
      const newState = store.getState();
      expect(newState.user).toBe(user);
    });
  });
});
