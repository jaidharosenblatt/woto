import moxios from "moxios";

import { storeFactory, setupFakeToken } from "../../../test/testUtils";
import selectors from "../selectors";
import actions from "./actionCreators";
import axiosConfig from "../../api/axiosConfig";

describe("initial state", () => {
  let store;
  beforeEach(() => {
    store = storeFactory();
  });
  test("user is empty", () => {
    return store.dispatch(actions.loadUser()).then(() => {
      const newUser = selectors.getUser(store.getState());
      expect(newUser).toEqual({});
    });
  });
  test("user is not authenticated", () => {
    return store.dispatch(actions.loadUser()).then(() => {
      const authenticationStatus = selectors.getAuthenticationStatus(
        store.getState()
      );
      expect(authenticationStatus).toBe(false);
    });
  });
});

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
      expect(newUser).toEqual(user);
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
        response: user,
      });
    });
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("adds user to state", () => {
    return store.dispatch(actions.login(user, userType)).then(() => {
      const newUser = selectors.getUser(store.getState());
      expect(newUser).toEqual(user);
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

describe("register updates state", () => {
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
        response: user,
      });
    });
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("adds user to state", () => {
    return store.dispatch(actions.register(user, userType)).then(() => {
      const newUser = selectors.getUser(store.getState());
      expect(newUser).toEqual(user);
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

describe("wrong credentials returns error", () => {
  const store = storeFactory();
  beforeEach(() => {
    moxios.install(axiosConfig);
    setupFakeToken();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.reject({ status: 500, message: "testing denied server" });
    });
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("login", () => {
    return store.dispatch(actions.login({}, "")).then(() => {
      const error = selectors.getError(store.getState());
      expect(error.length).not.toBe(0);
    });
  });
  test("register", () => {
    return store.dispatch(actions.register({}, "")).then(() => {
      const error = selectors.getError(store.getState());
      expect(error.length).not.toBe(0);
    });
  });
});

describe("edit updates existing profile", () => {
  const user = { email: "ex@gmail.com", password: "abc" };
  const modifiedUser = { ...user, password: "def" };
  const userType = "instructor";
  const store = storeFactory({ auth: { user } });
  beforeEach(() => {
    moxios.install(axiosConfig);
    setupFakeToken();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: modifiedUser,
      });
    });
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("updates user to state", () => {
    return store
      .dispatch(actions.editProfile(modifiedUser, userType))
      .then(() => {
        const newUser = selectors.getUser(store.getState());
        expect(newUser).toEqual(modifiedUser);
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
});
