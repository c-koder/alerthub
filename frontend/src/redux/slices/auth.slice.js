import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  userSignup,
  userSignin,
  userSignout,
  userRefresh,
  userNotifications,
} from "../../services/auth.service";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (params, { rejectWithValue }) => {
    try {
      const response = await userSignup(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.data);
    }
  }
);

export const signinUser = createAsyncThunk(
  "auth/signin",
  async (params, { rejectWithValue }) => {
    try {
      const response = await userSignin(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.data);
    }
  }
);

export const signoutUser = createAsyncThunk(
  "auth/signout",
  async (params, { rejectWithValue }) => {
    try {
      const response = await userSignout(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.data);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userRefresh();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.data);
    }
  }
);

export const getNotifications = createAsyncThunk(
  "auth/getNotifications",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await userNotifications();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const markNotificationsAsRead = createAsyncThunk(
  "auth/markNotificationsAsRead",
  async (_, { getState, dispatch }) => {
    const { notifications } = getState().auth;
    const updatedNotifications = notifications.map((notif) => ({
      ...notif,
      read: true,
    }));

    dispatch(setNotifications(updatedNotifications));
  }
);

export const updateUserCommunities = (payload) => ({
  type: "auth/updateUserCommunities",
  payload,
});

// Initial state
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

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.success = false;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    updateUserNotifications: (state, action) => {
      const newNotification = action.payload;
      const exists = state.notifications.some(
        (notif) => notif._id === newNotification._id
      );
      if (!exists) {
        state.notifications = [newNotification, ...state.notifications];
      }
    },
    updateUserCommunities: (state, action) => {
      const { communityId } = action.payload;
      if (!state.user.communities.includes(communityId)) {
        state.user.communities.push(communityId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.signupError = null;
        state.signupSuccess = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.signupSuccess = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.signupError = action.payload;
        state.signupSuccess = false;
      })
      // Signin
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.signinError = null;
        state.signinSuccess = false;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.signinSuccess = true;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.signinError = action.payload;
        state.signinSuccess = false;
      })
      // Signout
      .addCase(signoutUser.pending, (state) => {
        state.loading = true;
        state.signoutError = null;
        state.signoutSuccess = false;
      })
      .addCase(signoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.signoutSuccess = true;
      })
      .addCase(signoutUser.rejected, (state, action) => {
        state.loading = false;
        state.signoutError = action.payload;
        state.signoutSuccess = false;
      })
      // Fetch user
      .addCase(refreshUser.pending, (state) => {
        state.refreshing = true;
        state.refreshError = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.refreshing = false;
        state.user = action.payload.user;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.refreshing = false;
        state.refreshError = action.payload;
      })
      // Notifications
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
        state.notificationError = null;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.notificationError = action.payload;
      })
      // Notifications as Read
      .addCase(markNotificationsAsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map((notif) => ({
          ...notif,
          read: true,
        }));
      });
  },
});

export const { clearError, updateUserNotifications, setNotifications } =
  authSlice.actions;
export default authSlice.reducer;
