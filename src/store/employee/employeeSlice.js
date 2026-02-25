import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyTasks, myAttendance } from "./employeeAPI";

export const fetchTasks = createAsyncThunk(
  "employee/fetchTasks",
  async (page = 1, { rejectWithValue }) => {
    try {
      const res = await getMyTasks(page);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load tasks",
      );
    }
  },
);

export const fetchAttendance = createAsyncThunk(
  "employee/fetchAttendance",
  async (page = 1, { rejectWithValue }) => {
    try {
      const res = await myAttendance(page);
      return res.data;
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
    page: 1,
    pages: 1,
    attendanceLoading: true,
    taskLoading: true,
    error: null,
  },
  reducers: {
    clearEmployeeError: (state) => {
      state.error = null;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.taskLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.taskLoading = false;
        state.tasks = action.payload.tasks;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.taskLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchAttendance.pending, (state) => {
        state.attendanceLoading = true;
        state.error = null;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.attendanceLoading = false;
        state.attendance = action.payload.data;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.error = null;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.attendanceLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEmployeeError, setPage } = empSlice.actions;
export default empSlice.reducer;
