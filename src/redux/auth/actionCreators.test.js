import moxios from "moxios";

import { storeFactory } from "../../../test/testUtils";
import selectors from "../selectors";
import actions from "./actionCreators";
import axiosConfig from "../../api/axiosConfig";
describe("auth action creator", () => {
  const user = { name: "Jaidha" };
  const store = storeFactory();

  beforeEach(() => {
    moxios.install(axiosConfig);
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("loadUser adds user to state", () => {
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
