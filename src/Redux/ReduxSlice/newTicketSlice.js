import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { axiosApi } from "../../config/Axiox";

// REQUEST TYPE MASTER
export const getRequestType = createAsyncThunk(
  "newTicket/getRequestType",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/requesttype/status");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// COMPLAINT DEPARTMENT
export const getComplaintDept = createAsyncThunk(
  "newTicket/getComplaintDept",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/complaintdept/status");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// COMPLAINT TYPE
export const getComplaintType = createAsyncThunk(
  "newTicket/getComplaintType",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/mobileapp/Type");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// GET LOCATION
export const getLocation = createAsyncThunk(
  "newTicket/getLocation",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/deptsecmaster/status");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// GET COMPLAINT SLNO
export const getCmpSlno = createAsyncThunk(
  "newTicket/getCmpSlno",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/common/getCompSerialno");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const initialState = {
  requestType: {
    reqType: [],
    status: "idle", // idle, loading, succeeded, failed
    error: null,
  },
  complaintDept: {
    dept: [],
    status: "idle",
    error: null,
  },
  complaintType: {
    type: [],
    status: "idle",
    error: null,
  },
  getLocation: {
    location: [],
    status: "idle",
    error: null,
  },
  locationVal: {
    location: 0,
  },
  complaintSlno: {
    slno: null,
    status: "idle",
    error: null,
  },
  selectedDept: null,
  selectedComplaintType: null,
  selectedDepartmentSectionId: null,
  selectedDepartmentLocation: null,
};

const newTicketSlice = createSlice({
  name: "newTicket",
  initialState,
  reducers: {
    updateLocationValue: (state, { payload }) => {
      state.locationVal.location = payload;
    },
    setSelectedDept: (state, { payload }) => {
      state.selectedDept = payload;
    },
    setSelectedComplaintType: (state, { payload }) => {
      state.selectedComplaintType = payload;
    },
    setSelectedDepartmentSectionId: (state, { payload }) => {
      state.selectedDepartmentSectionId = payload;
    },
    setSelectedDepartmentLocation: (state, { payload }) => {
      state.selectedDepartmentLocation = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Request Type
      .addCase(getRequestType.pending, (state) => {
        state.requestType.status = "loading";
        state.requestType.error = null;
      })
      .addCase(getRequestType.fulfilled, (state, { payload }) => {
        state.requestType.status = "succeeded";
        state.requestType.reqType = payload.data || [];
        state.requestType.error = null;
      })
      .addCase(getRequestType.rejected, (state, { payload }) => {
        state.requestType.status = "failed";
        state.requestType.error = payload.message;
      })
      // Complaint Department
      .addCase(getComplaintDept.pending, (state) => {
        state.complaintDept.status = "loading";
        state.complaintDept.error = null;
      })
      .addCase(getComplaintDept.fulfilled, (state, { payload }) => {
        state.complaintDept.status = "succeeded";
        state.complaintDept.dept = payload.data || [];
        state.complaintDept.error = null;
      })
      .addCase(getComplaintDept.rejected, (state, { payload }) => {
        state.complaintDept.status = "failed";
        state.complaintDept.error = payload.message;
      })
      // Complaint Type
      .addCase(getComplaintType.pending, (state) => {
        state.complaintType.status = "loading";
        state.complaintType.error = null;
      })
      .addCase(getComplaintType.fulfilled, (state, { payload }) => {
        state.complaintType.status = "succeeded";
        state.complaintType.type = payload.data || [];
        state.complaintType.error = null;
      })
      .addCase(getComplaintType.rejected, (state, { payload }) => {
        state.complaintType.status = "failed";
        state.complaintType.error = payload.message;
      })
      // Location
      .addCase(getLocation.pending, (state) => {
        state.getLocation.status = "loading";
        state.getLocation.error = null;
      })
      .addCase(getLocation.fulfilled, (state, { payload }) => {
        state.getLocation.status = "succeeded";
        state.getLocation.location = payload.data || [];
        state.getLocation.error = null;
      })
      .addCase(getLocation.rejected, (state, { payload }) => {
        state.getLocation.status = "failed";
        state.getLocation.error = payload.message;
      })
      // Complaint Serial Number
      .addCase(getCmpSlno.pending, (state) => {
        state.complaintSlno.status = "loading";
        state.complaintSlno.error = null;
      })
      .addCase(getCmpSlno.fulfilled, (state, { payload }) => {
        state.complaintSlno.status = "succeeded";
        state.complaintSlno.slno = payload.data || null;
        state.complaintSlno.error = null;
      })
      .addCase(getCmpSlno.rejected, (state, { payload }) => {
        state.complaintSlno.status = "failed";
        state.complaintSlno.error = payload.message;
      });
  },
});

// Memoized Selectors
export const getRequestTypeList = createSelector(
  [(state) => state.newTicket.requestType.reqType],
  (reqType) => reqType
);

export const getComplaintDeptList = createSelector(
  [(state) => state.newTicket.complaintDept.dept],
  (dept) =>
    dept?.map((e) => ({
      id: e.complaint_dept_slno,
      value: e.complaint_dept_slno,
      label: e.complaint_dept_name,
    })) || []
);

export const getComplaintTypeList = createSelector(
  [(state) => state.newTicket.complaintType.type],
  (type) => type
);

export const getLocationList = createSelector(
  [(state) => state.newTicket.getLocation.location],
  (location) => location
);

export const getLocationVal = createSelector(
  [(state) => state.newTicket.locationVal.location],
  (location) => location
);

export const getComplaintSlno = createSelector(
  [(state) => state.newTicket.complaintSlno.slno],
  (slno) => slno?.[0]?.serial_current || null
);

// Status and Error Selectors
export const getComplaintDeptStatus = createSelector(
  [(state) => state.newTicket.complaintDept.status],
  (status) => status
);

export const getComplaintDeptError = createSelector(
  [(state) => state.newTicket.complaintDept.error],
  (error) => error
);

export const getSelectedDept = createSelector(
  [(state) => state.newTicket.selectedDept],
  (selectedDept) => selectedDept
);

export const getSelectedComplaintType = createSelector(
  [(state) => state.newTicket.selectedComplaintType],
  (selectedComplaintType) => selectedComplaintType
);

export const getSelectedDepartmentSectionId = createSelector(
  [(state) => state.newTicket.selectedDepartmentSectionId],
  (selectedDepartmentSectionId) => selectedDepartmentSectionId
);

export const getSelectedLocationId = createSelector(
  [(state) => state.newTicket.selectedDepartmentLocation],
  (selectedDepartmentLocation) => selectedDepartmentLocation
);

export const {
  updateLocationValue,
  setSelectedDept,
  setSelectedComplaintType,
  setSelectedDepartmentSectionId,
  setSelectedDepartmentLocation,
} = newTicketSlice.actions;

export default newTicketSlice.reducer;
