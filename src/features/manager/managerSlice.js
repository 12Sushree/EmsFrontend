import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { teamDetails } from "./managerAPI";

export const fetchTeam = createAsyncThunk(
  "manager/fetchTeam",
  async (_, { rejectWithValue }) => {
    try {
      const res = await teamDetails();
      return {
        team: res.data.team,
        teamSize: res.data.teamSize,
      };
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
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload.team;
        state.teamSize = action.payload.teamSize;
      })
      .addCase(fetchTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default managerSlice.reducer;
