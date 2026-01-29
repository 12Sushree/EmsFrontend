import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyTasks, myAttendance } from "./employeeAPI";

export const fetchTasks = createAsyncThunk(
  "employee/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMyTasks();
      return res.data.tasks;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load tasks",
      );
    }
  },
);

export const fetchAttendance = createAsyncThunk(
  "employee/fetchAttendance",
  async (_, { rejectWithValue }) => {
    try {
      const res = await myAttendance();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load attendance",
      );
    }
  },
);

const empSlice = createSlice({
  name: "employee",
  initialState: {
    tasks: [],
    attendance: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearEmployeeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEmployeeError } = empSlice.actions;
export default empSlice.reducer;
