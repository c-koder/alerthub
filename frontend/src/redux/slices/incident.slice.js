import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createIncident, getIncidents } from "../../services/incident.service";

// Async thunk to create a incident
export const createNewIncident = createAsyncThunk(
  "incident/create",
  async (params, { rejectWithValue }) => {
    try {
      const response = await createIncident(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.data);
    }
  }
);

// Async thunk to fetch a single incident by code
export const fetchIncidents = createAsyncThunk(
  "incident/get",
  async (code, { rejectWithValue }) => {
    try {
      const response = await getIncidents(code);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.data);
    }
  }
);

// Initial state
const initialState = {
  incidents: [],
  loading: false,
  error: null,
  success: false,
  createLoading: false,
  createError: null,
  createSuccess: false,
};

// Slice
const incidentSlice = createSlice({
  name: "incident",
  initialState,
  reducers: {
    clearIncidentError: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Incident
      .addCase(createNewIncident.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(createNewIncident.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createSuccess = true;
      })
      .addCase(createNewIncident.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload;
        state.createSuccess = false;
      })
      // Get Incidents by incident code
      .addCase(fetchIncidents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncidents.fulfilled, (state, action) => {
        state.loading = false;
        state.incidents = action.payload.data;
      })
      .addCase(fetchIncidents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearIncidentError } = incidentSlice.actions;
export default incidentSlice.reducer;
