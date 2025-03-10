import authReducer, {
  signupUser,
  signinUser,
  signoutUser,
  getNotifications,
  markNotificationsAsRead,
  updateUserNotifications,
} from "../slices/auth.slice";

jest.mock("../../services/auth.service", () => ({
  userSignin: jest.fn(),
  userSignup: jest.fn(),
  userSignout: jest.fn(),
  userNotifications: jest.fn(),
}));

describe("Auth Slice Reducer Tests", () => {
  const initialState = {
    user: null,
    loading: false,
    refreshing: false,
    notifications: [],
    notificationError: null,
    signinError: null,
    signupError: null,
    signoutError: null,
    refreshError: null,
    signinSuccess: false,
    signupSuccess: false,
    signoutSuccess: false,
  };

  test("Initial state should match the initial state in the slice", () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  test("Signup action - fulfilled", () => {
    const action = {
      type: signupUser.fulfilled.type,
      payload: { user: { _id: "123", username: "John" } },
    };

    const expectedState = {
      ...initialState,
      user: { _id: "123", username: "John" },
      signupSuccess: true,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  test("Signin action - fulfilled", () => {
    const action = {
      type: signinUser.fulfilled.type,
      payload: { user: { _id: "123", username: "Jane" } },
    };

    const expectedState = {
      ...initialState,
      user: { _id: "123", username: "Jane" },
      signinSuccess: true,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  test("Signout action - fulfilled", () => {
    const action = { type: signoutUser.fulfilled.type };

    const expectedState = {
      ...initialState,
      user: null,
      signoutSuccess: true,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  test("Notifications action - fulfilled", () => {
    const action = {
      type: getNotifications.fulfilled.type,
      payload: [{ _id: "1", content: "New Notification" }],
    };

    const expectedState = {
      ...initialState,
      notifications: [{ _id: "1", content: "New Notification" }],
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  test("Mark notifications as read", () => {
    const action = { type: markNotificationsAsRead.fulfilled.type };
    const state = {
      ...initialState,
      notifications: [{ _id: "1", content: "Test", read: false }],
    };

    const expectedState = {
      ...state,
      notifications: [{ _id: "1", content: "Test", read: true }],
    };

    expect(authReducer(state, action)).toEqual(expectedState);
  });

  test("updateUserNotifications", () => {
    const action = updateUserNotifications({
      _id: "2",
      content: "New alert",
    });
    const state = {
      ...initialState,
      notifications: [{ _id: "1", content: "Test" }],
    };

    const expectedState = {
      ...state,
      notifications: [
        { _id: "2", content: "New alert" },
        { _id: "1", content: "Test" },
      ],
    };

    expect(authReducer(state, action)).toEqual(expectedState);
  });
});
