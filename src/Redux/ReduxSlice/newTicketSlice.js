import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosApi } from '../../config/Axiox';

//REQUEST TYPE MASTER
const getRequestType = createAsyncThunk('api/getRequestType', () => {
    return axiosApi.get('/requesttype/status')
        .then((response) => {
            return response.data;
        })
})

//COMPLAINT DEPARTMENT
const getComplaintDept = createAsyncThunk('api/getComplaintDept', () => {
    return axiosApi.get('/complaintdept/status')
        .then((response) => {
            return response.data;
        })
})

//COMPLAINT TYPE
const getComplaintType = createAsyncThunk('api/getComplaintType', () => {
    return axiosApi.get(`/mobileapp/Type`)
        .then((response) => {
            return response.data;
        })
})

//GET LOCATION
const getLocation = createAsyncThunk('api/getLocation', () => {
    return axiosApi.get('/deptsecmaster/status')
        .then((response) => {
            return response.data;
        })
})

//GET COMLAINT SLNO
const getCmpSlno = createAsyncThunk('api/getCmpSlno', () => {
    return axiosApi.get('/common/getCompSerialno')
        .then((response) => {
            return response.data;
        })
})

const initialState = {
    requestType: {
        reqType: [],
        status: 0,
        message: ""
    },
    complaintDept: {
        dept: [],
        status: 0,
        message: ""
    },
    complaintType: {
        type: [],
        status: 0,
        message: ""
    },
    getLocation: {
        location: [],
        status: 0,
        message: ""
    },
    locationVal: {
        location: 0
    },
    complaintSlno: {
        slno: 0
    }
}

const newTicketSlice = createSlice({
    name: 'commonFunSlice',
    initialState,
    reducers: {
        updateLocationValue: (state, { payload }) => {
            state.locationVal.location = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRequestType.pending, (state) => {
                state.requestType.status = 0
                state.requestType.message = "pending"
            })
            .addCase(getRequestType.rejected, (state) => {
                state.requestType.status = 2
                state.requestType.message = "Error"
            })
            .addCase(getRequestType.fulfilled, (state, { payload }) => {
                state.requestType.status = 1
                state.requestType.message = payload.message
                state.requestType.reqType = payload.data
            })
            .addCase(getComplaintDept.pending, (state) => {
                state.complaintDept.status = 0
                state.complaintDept.message = "pending"
            })
            .addCase(getComplaintDept.rejected, (state) => {
                state.complaintDept.status = 2
                state.complaintDept.message = "Error"
            })
            .addCase(getComplaintDept.fulfilled, (state, { payload }) => {
                state.complaintDept.status = 1
                state.complaintDept.message = payload.message
                state.complaintDept.dept = payload.data
            })
            .addCase(getComplaintType.pending, (state) => {
                state.complaintType.status = 0
                state.complaintType.message = "pending"
            })
            .addCase(getComplaintType.rejected, (state) => {
                state.complaintType.status = 2
                state.complaintType.message = "Error"
            })
            .addCase(getComplaintType.fulfilled, (state, { payload }) => {
                state.complaintType.status = 1
                state.complaintType.message = payload.message
                state.complaintType.type = payload.data
            })
            .addCase(getLocation.pending, (state) => {
                state.getLocation.status = 0
                state.getLocation.message = "pending"
            })
            .addCase(getLocation.rejected, (state) => {
                state.getLocation.status = 2
                state.getLocation.message = "Error"
            })
            .addCase(getLocation.fulfilled, (state, { payload }) => {
                state.getLocation.status = 1
                state.getLocation.message = payload.message
                state.getLocation.location = payload.data
            })
            .addCase(getCmpSlno.pending, (state) => {
                state.complaintSlno.status = 0
                state.complaintSlno.message = "pending"
            })
            .addCase(getCmpSlno.rejected, (state) => {
                state.complaintSlno.status = 2
                state.complaintSlno.message = "Error"
            })
            .addCase(getCmpSlno.fulfilled, (state, { payload }) => {
                state.complaintSlno.status = 1
                state.complaintSlno.message = payload.message
                state.complaintSlno.slno = payload.data
            })
    }
})


export {
    getRequestType,
    getComplaintDept,
    getComplaintType,
    getLocation,
    getCmpSlno
}

export const {
    updateLocationValue
} = newTicketSlice.actions

export const getRequestTypeList = state => state.newTicket.requestType?.reqType
export const getComplaintDeptList = (state) => {
    let deptList = state.newTicket.complaintDept?.dept
    return deptList?.map((e) => {
        return {
            id: e.complaint_dept_slno,
            value: e.complaint_dept_slno,
            label: e.complaint_dept_name
        }
    })
}
export const getComplaintTypeList = state => state.newTicket.complaintType?.type
export const getLocationList = state => state.newTicket.getLocation?.location
export const getLocationVal = state => state.newTicket.locationVal?.location
export const getComplaintSlno = state => state.newTicket.complaintSlno?.slno[0]?.serial_current

export default newTicketSlice.reducer