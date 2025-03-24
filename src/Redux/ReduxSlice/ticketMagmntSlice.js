import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosApi } from '../../config/Axiox';

//GET THE NOT ASSIGNED COMPLAINTS LIST -- All tickets not assigned

const getNotAssignedComplaintList = createAsyncThunk('api/getNotAssignedComplaintList', (id) => {
    return axiosApi.get(`/mobileapp/notassigncomplaints/deptBased/${id}`)
        .then((response) => {
            return response.data;
        })
})

// GET THE TICKETS COUNT 

const getComDetlcountEmp = createAsyncThunk('api/getComDetlcountEmp', (id) => {
    return axiosApi.get(`/mobileapp/getComDetlcountEmp/${id}`)
        .then((response) => {
            return response.data;
        })
})

//EMPLOYEE WISE TICKETS DETAILS

//ASSIGNED LIST 
const getAssignListEmp = createAsyncThunk('api/getAssignListEmp', (id) => {
    return axiosApi.get(`/mobileapp/assignList/empwise/${id}`)
        .then((response) => {
            return response.data;
        })
})
//ASSIST LIST
const getAssistListEmp = createAsyncThunk('api/getAssistListEmp', (id) => {
    return axiosApi.get(`/mobileapp/assistList/empwise/${id}`)
        .then((response) => {
            return response.data;
        })
})
//ON HOLD LIST
const getOnHoldListEmp = createAsyncThunk('api/getOnHoldListEmp', (id) => {
    return axiosApi.get(`/mobileapp/onHoldList/empwise/${id}`)
        .then((response) => {
            return response.data;
        })
})
//ON PROGRESS LIST
const getOnProgressListEmp = createAsyncThunk('api/getOnProgressListEmp', (id) => {
    return axiosApi.get(`/mobileapp/onProgressList/empwise/${id}`)
        .then((response) => {
            return response.data;
        })
})
//FOR VERIFY LIST
const getforVerifyListEmp = createAsyncThunk('api/getforVerifyListEmp', (id) => {
    return axiosApi.get(`/mobileapp/forVerifyList/empwise/${id}`)
        .then((response) => {
            return response.data;
        })
})
//COMPLETE LIST
const getCompleteListEmp = createAsyncThunk('api/getCompleteListEmp', (id) => {
    return axiosApi.get(`/mobileapp/completeList/empwise/${id}`)
        .then((response) => {
            return response.data;
        })
})

//GE THE ACTUAL ASSIGNED EMPLOYEE AGAINST THE COMPLAINT
const getActualTicketAssingedEmp = createAsyncThunk('api/getActualTicketAssingedEmp', (id) => {
    return axiosApi.get(`/Rectifycomplit/getAssignEmps/${id}`)
        .then((response) => {
            return response.data;
        })
})

const initialState = {
    notAssignedCompList: {
        data: [],
        status: 0,
        message: ""
    },
    ticketCount: {
        data: [],
        status: 0,
        message: ""
    },
    assignList: {
        data: [],
        status: 0,
        message: ""
    },
    assistList: {
        data: [],
        status: 0,
        message: ""
    },
    onHoldList: {
        data: [],
        status: 0,
        message: ""
    },
    onProgressList: {
        data: [],
        status: 0,
        message: ""
    },
    forVerifyList: {
        data: [],
        status: 0,
        message: ""
    },
    completeList: {
        data: [],
        status: 0,
        message: ""
    },
    assignedEmplyee: {
        employee: [],
        status: 0,
        message: ""
    }
}


const ticketMagmentEmpSlice = createSlice({
    name: "ticketMagmentEmpSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getNotAssignedComplaintList.pending, (state) => {
                state.notAssignedCompList.status = 0
                state.notAssignedCompList.message = "Pending...."
            })
            .addCase(getNotAssignedComplaintList.rejected, (state) => {
                state.notAssignedCompList.status = 2
                state.notAssignedCompList.message = "Error...."
            })
            .addCase(getNotAssignedComplaintList.fulfilled, (state, { payload }) => {
                state.notAssignedCompList.status = 1
                state.notAssignedCompList.message = "Success"
                state.notAssignedCompList.data = payload
            })
            .addCase(getComDetlcountEmp.pending, (state) => {
                state.ticketCount.status = 0
                state.ticketCount.message = "Pending"
            })
            .addCase(getComDetlcountEmp.rejected, (state) => {
                state.ticketCount.status = 2
                state.ticketCount.message = "Error"
            })
            .addCase(getComDetlcountEmp.fulfilled, (state, { payload }) => {
                state.ticketCount.status = 1
                state.ticketCount.message = "Success"
                state.ticketCount.data = payload
            })
            .addCase(getAssignListEmp.pending, (state) => {
                state.assignList.status = 0
                state.assignList.message = "Pending"
            })
            .addCase(getAssignListEmp.rejected, (state) => {
                state.assignList.status = 2
                state.assignList.message = "Error"
            })
            .addCase(getAssignListEmp.fulfilled, (state, { payload }) => {
                state.assignList.status = 1
                state.assignList.message = "Success"
                state.assignList.data = payload
            })
            .addCase(getAssistListEmp.pending, (state) => {
                state.assistList.status = 0
                state.assistList.message = "Pending"
            })
            .addCase(getAssistListEmp.rejected, (state) => {
                state.assistList.status = 2
                state.assistList.message = "Error"
            })
            .addCase(getAssistListEmp.fulfilled, (state, { payload }) => {
                state.assistList.status = 1
                state.assistList.message = "Success"
                state.assistList.data = payload
            })
            .addCase(getOnHoldListEmp.pending, (state) => {
                state.onHoldList.status = 0
                state.onHoldList.message = "Pending"
            })
            .addCase(getOnHoldListEmp.rejected, (state) => {
                state.onHoldList.status = 2
                state.onHoldList.message = "Error"
            })
            .addCase(getOnHoldListEmp.fulfilled, (state, { payload }) => {
                state.onHoldList.status = 1
                state.onHoldList.message = "Success"
                state.onHoldList.data = payload
            })
            .addCase(getOnProgressListEmp.pending, (state) => {
                state.onProgressList.status = 0
                state.onProgressList.message = "Pending"
            })
            .addCase(getOnProgressListEmp.rejected, (state) => {
                state.onProgressList.status = 2
                state.onProgressList.message = "Error"
            })
            .addCase(getOnProgressListEmp.fulfilled, (state, { payload }) => {
                state.onProgressList.status = 1
                state.onProgressList.message = "Success"
                state.onProgressList.data = payload
            })
            .addCase(getforVerifyListEmp.pending, (state) => {
                state.forVerifyList.status = 0
                state.forVerifyList.message = "Pending"
            })
            .addCase(getforVerifyListEmp.rejected, (state) => {
                state.forVerifyList.status = 2
                state.forVerifyList.message = "Error"
            })
            .addCase(getforVerifyListEmp.fulfilled, (state, { payload }) => {
                state.forVerifyList.status = 1
                state.forVerifyList.message = "Success"
                state.forVerifyList.data = payload
            })
            .addCase(getCompleteListEmp.pending, (state) => {
                state.completeList.status = 0
                state.completeList.message = "Pending"
            })
            .addCase(getCompleteListEmp.rejected, (state) => {
                state.completeList.status = 2
                state.completeList.message = "Error"
            })
            .addCase(getCompleteListEmp.fulfilled, (state, { payload }) => {
                state.completeList.status = 1
                state.completeList.message = "Success"
                state.completeList.data = payload
            })
            .addCase(getActualTicketAssingedEmp.pending, (state) => {
                state.assignedEmplyee.status = 0
                state.assignedEmplyee.message = "Pending"
            })
            .addCase(getActualTicketAssingedEmp.rejected, (state) => {
                state.assignedEmplyee.status = 2
                state.assignedEmplyee.message = "Error"
            })
            .addCase(getActualTicketAssingedEmp.fulfilled, (state, { payload }) => {
                state.assignedEmplyee.status = 1
                state.assignedEmplyee.message = "Success"
                state.assignedEmplyee.employee = payload
            })
    }
})

export const getTicketCount = state => state.ticketUser.ticketCount.data.data?.[0];
export const getNotAssignedCount = state => state.ticketUser.notAssignedCompList.data.data?.length;
export const getNotAssignedList = state => state.ticketUser.notAssignedCompList.data.data;
export const getTicketActualEmp = state => state.ticketUser.assignedEmplyee.employee;
export const assignedListUserWise = state => state.ticketUser.assignList?.data?.data;
export const assistListUserWise = state => state.ticketUser.assistList.data?.data;
export const getOnholdCompList = state => state.ticketUser.onHoldList.data?.data;
export const getOnVerifyList = state => state.ticketUser.forVerifyList.data?.data;
export const getOnProgressList = state => state.ticketUser.onProgressList.data?.data;

export const getEmpWiseTicket = (state) => {
    const newTickCount = state.ticketUser.notAssignedCompList.data.data?.length;
    let Obj = [{ "countype": "NT", "total": newTickCount }];
    return Obj
}

export {
    getNotAssignedComplaintList,
    getComDetlcountEmp,
    getAssignListEmp,
    getAssistListEmp,
    getOnHoldListEmp,
    getOnProgressListEmp,
    getforVerifyListEmp,
    getCompleteListEmp,
    getActualTicketAssingedEmp
}

export default ticketMagmentEmpSlice.reducer