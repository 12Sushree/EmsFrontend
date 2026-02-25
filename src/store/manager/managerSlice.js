import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { teamDetails } from "./managerAPI";

export const fetchTeam = createAsyncThunk(
  "manager/fetchTeam",
  async (page = 1, { rejectWithValue }) => {
    try {
      const res = await teamDetails(page);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

const managerSlice = createSlice({
  name: "manager",
  initialState: {
    team: [],
    teamSize: 0,
    page: 1,
    pages: 1,
    loading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload.team;
        state.teamSize = action.payload.teamSize;
        state.page = action.payload.page;
        state.pages = action.payload.totalPages;
      })
      .addCase(fetchTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default managerSlice.reducer;
