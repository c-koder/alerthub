import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCommunity,
  joinCommunity,
  listCommunities,
  getCommunity,
} from "../../services/community.service";

import { updateUserCommunities } from "./auth.slice";

// Async thunk to create a community
export const createNewCommunity = createAsyncThunk(
  "community/create",
  async (params, { rejectWithValue }) => {
    try {
      const response = await createCommunity(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.data);
    }
  }
);

// Async thunk to join a community
export const joinExistingCommunity = createAsyncThunk(
  "community/join",
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await joinCommunity(params);
      dispatch(updateUserCommunities({ communityId: params.communityId }));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.data);
    }
  }
);

// Async thunk to fetch all communities
export const fetchCommunities = createAsyncThunk(
  "community/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await listCommunities();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.data);
    }
  }
);

// Async thunk to fetch a single community by code
export const fetchCommunityByCode = createAsyncThunk(
  "community/get",
  async (code, { rejectWithValue }) => {
    try {
      const response = await getCommunity(code);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.data);
    }
  }
);

// Initial state
const initialState = {
  communities: [],
  community: null,
  activeCommunityId: null,
  loading: false,
  error: null,
  success: false,
  createLoading: false,
  createError: null,
  createSuccess: false,
  joinLoading: false,
  joinError: null,
  joinSuccess: false,
};

// Slice
const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    clearCommunityError: (state) => {
      state.error = null;
      state.success = false;
    },
    setActiveCommunity: (state, action) => {
      state.activeCommunityId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Community
      .addCase(createNewCommunity.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(createNewCommunity.fulfilled, (state, action) => {
        state.createLoading = false;
        state.communities.push(action.payload.data);
        state.createSuccess = true;
      })
      .addCase(createNewCommunity.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload;
        state.createSuccess = false;
      })
      // Join Community
      .addCase(joinExistingCommunity.pending, (state) => {
        state.joinLoading = true;
        state.joinError = null;
      })
      .addCase(joinExistingCommunity.fulfilled, (state, action) => {
        state.joinLoading = false;
        state.joinSuccess = true;
      })
      .addCase(joinExistingCommunity.rejected, (state, action) => {
        state.joinLoading = false;
        state.joinError = action.payload;
      })
      // List Communities
      .addCase(fetchCommunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.loading = false;
        state.communities = action.payload.data;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Community by Code
      .addCase(fetchCommunityByCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunityByCode.fulfilled, (state, action) => {
        state.loading = false;
        state.community = action.payload.data;
      })
      .addCase(fetchCommunityByCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCommunityError, setActiveCommunity } =
  communitySlice.actions;
export default communitySlice.reducer;
