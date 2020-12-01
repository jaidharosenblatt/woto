import moxios from "moxios";

import { storeFactory, setupFakeToken } from "../../../test/testUtils";
import selectors from "../selectors";
import actions from "./actionCreators";
import axiosConfig from "../../api/axiosConfig";

describe("loadUser updates state", () => {
  const user = { name: "Jaidha" };
  const store = storeFactory();
  beforeEach(() => {
    moxios.install(axiosConfig);
    setupFakeToken();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: user,
      });
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });
  test("adds user to state", () => {
    return store.dispatch(actions.loadUser()).then(() => {
      const newUser = selectors.getUser(store.getState());
      expect(newUser).toBe(user);
    });
  });
  test("mark as authenticated", () => {
    return store.dispatch(actions.loadUser()).then(() => {
      const authenticationStatus = selectors.getAuthenticationStatus(
        store.getState()
      );
      expect(authenticationStatus).toBe(true);
    });
  });
});

describe("login updates state", () => {
  const user = { email: "ex@gmail.com", password: "abc" };
  const userType = "instructor";
  const store = storeFactory({ auth: { userType: "student" } });
  beforeEach(() => {
    moxios.install(axiosConfig);
    setupFakeToken();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: newUser,
      });
    });
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("adds user to state", () => {
    return store.dispatch(actions.login(user, userType)).then(() => {
      const newUser = selectors.getUser(store.getState());
      expect(newUser).toBe(user);
    });
  });
  test("mark as authenticated", () => {
    return store.dispatch(actions.login(user, userType)).then(() => {
      const authenticationStatus = selectors.getAuthenticationStatus(
        store.getState()
      );
      expect(authenticationStatus).toBe(true);
    });
  });
  test("updates userType", () => {
    return store.dispatch(actions.login(user, userType)).then(() => {
      const newUserType = selectors.getUserType(store.getState());
      expect(newUserType).toBe(userType);
    });
  });
});

describe("register creates new user", () => {
  const user = { email: "ex@gmail.com", password: "abc" };
  const userType = "instructor";
  const store = storeFactory();
  beforeEach(() => {
    moxios.install(axiosConfig);
    setupFakeToken();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: newUser,
      });
    });
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("initial empty state", () => {
    const newUser = selectors.getUser(store.getState());
    expect(newUser).toEqual({});
  });
  test("adds user to state", () => {
    return store.dispatch(actions.register(user, userType)).then(() => {
      const newUser = selectors.getUser(store.getState());
      expect(newUser).toBe(user);
    });
  });
  test("mark as authenticated", () => {
    return store.dispatch(actions.register(user, userType)).then(() => {
      const authenticationStatus = selectors.getAuthenticationStatus(
        store.getState()
      );
      expect(authenticationStatus).toBe(true);
    });
  });
  test("updates userType", () => {
    return store.dispatch(actions.register(user, userType)).then(() => {
      const newUserType = selectors.getUserType(store.getState());
      expect(newUserType).toBe(userType);
    });
  });
});
