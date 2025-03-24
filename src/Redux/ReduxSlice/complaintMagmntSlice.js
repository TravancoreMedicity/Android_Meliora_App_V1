import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosApi } from '../../config/Axiox';

// for get the not assigned complaint list department wise { pass employee department}
const getNotAssignedComplaintList = createAsyncThunk('api/getNotAssignedComplaintList', (id) => {
    return axiosApi.get(`/complaintassign/${id}`)
        .then((response) => {
            return response.data;
        })
})

//for assigned complaint {user id as input}
const getAssignedTicketList = createAsyncThunk('api/getAssignedTicketList', (id) => {
    return axiosApi.get(`/complaintassign/user/${id}`)
        .then((response) => {
            return response.data.data;
        })
})

// for assist { user id as input}
const getAssistTicketList = createAsyncThunk('api/getAssistTicketList', (id) => {
    return axiosApi.get(`/complaintassign/individual/assist/${id}`)
        .then((response) => {
            return response.data;
        })
})

//ACTION FOR GETTING THE ACTUAL ASSIGNED EMPLOYEE LIST FROM 
const getTheActualEmployee = createAsyncThunk('api/getTheActualEmployee', (id) => {
    return axiosApi.get(`/Rectifycomplit/getAssignEmps/${id}`)
        .then((response) => {
            return response.data;
        })
})

// for assist { user id as input}
const getTheAssignedListOnly = createAsyncThunk('api/getTheActualEmployee', (id) => {
    return axiosApi.get(`/complaintassign/assignedList/${id}`)
        .then((response) => {
            return response.data;
        })
})

// for assist { user id as input}
const getTheAssignedListForVerify = createAsyncThunk('api/getTheActualEmployee', (id) => {
    return axiosApi.get(`/complaintassign/forVerifyList/${id}`)
        .then((response) => {
            return response.data;
        })
})

const initialState = {
    ticketCount: {
        newTicketCount: 0,
        assignedTickectCount: 0,
        assistTicketCount: 0,
        onHoldTicketCount: 0,
        forVerifyTicketCount: 0,
        todayCompletedCount: 0,
        status: 0,
        message: ""
    },
    dashCountVariable: {
        dashCount: 0,
        status: 0,
        message: ""
    },
    notAssignedList: {
        notAssignedList: [],
        status: 0,
        message: ""
    },
    AssignedListUserWise: {
        AssignedList: [],
        status: 0,
        message: ""
    },
    AssitanceListUserWise: {
        assistanceList: [],
        status: 0,
        message: ""
    },
    totdayCompletedTicket: {
        completedTicket: [],
        status: 0,
        message: ""
    },
    totalOnholdTicketList: {
        onHoldTicked: [],
        status: 0,
        message: ""
    },
    totalOnProgressTicket: {
        onProgressTotal: [],
        status: 0,
        message: ""
    },
    verifyPending: {
        verifyPending: [],
        status: 0,
        message: ""
    },
    actialAssignedEmpList: {
        actEmpList: [],
        status: 0,
        message: ""
    },
    assignedInitialState: {
        assignedList: [],
        status: 0,
        message: ""
    },
    rectifiedListForVerify: {
        rectifiedList: [],
        status: 0,
        message: ""
    }
}


const complaintMangementSlice = createSlice({
    name: 'complaintManagementSlice',
    initialState,
    reducers: {
        assignedOnluyCount: (state, { payload }) => {
            state.ticketCount = {
                ...state.ticketCount,
                assignedTickectCount: payload,
                status: 1,
                message: "Updated"
            }
        },
        assignedListOnly: (state, { payload }) => {
            state.assignedInitialState = {
                ...state.assignedInitialState,
                assignedList: payload,
                status: 0,
                message: "Updated"
            }
        },
        forVerifyLists: (state, { payload }) => {
            state.rectifiedListForVerify = {
                ...state.rectifiedListForVerify,
                rectifiedList: payload,
                status: 1,
                message: "updated"
            }
        },
        totalVerifyCOunts: (state, { payload }) => {
            state.ticketCount = {
                ...state.ticketCount,
                forVerifyTicketCount: payload,
                status: 0,
                message: "Updated"
            }
        },
        ohHoldLists: (state, { payload }) => {
            state.totalOnholdTicketList = {
                ...state.totalOnholdTicketList,
                onHoldTicked: payload,
                status: 1,
                message: "updated"
            }
        },
        onHoldCOunts: (state, { payload }) => {
            state.ticketCount = {
                ...state.ticketCount,
                onHoldTicketCount: payload,
                status: 1,
                message: "Updated"
            }
        },
        onProgressLists: (state, { payload }) => {
            state.totalOnProgressTicket = {
                ...state.totalOnProgressTicket,
                onProgressTotal: payload,
                status: 1,
                message: "Updated"
            }
        },
        onProgressTotals: (state, { payload }) => {
            state.ticketCount = {
                ...state.ticketCount,
                todayCompletedCount: payload,
                status: 1,
                message: "Updated"
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotAssignedComplaintList.pending, (state) => {
                state.ticketCount.status = 0
                state.message = "loading"
            })
            .addCase(getNotAssignedComplaintList.rejected, (state) => {
                state.status = 2
                state.message = "getting error"
            })
            .addCase(getNotAssignedComplaintList.fulfilled, (state, { payload }) => {
                const count = Object.keys(payload).length;
                state.ticketCount.newTicketCount = count
                state.notAssignedList.notAssignedList = payload
                state.ticketCount.status = 1
                state.ticketCount.message = "success"
            })
            .addCase(getAssignedTicketList.pending, (state) => {
                state.AssignedListUserWise.status = 0
                state.AssignedListUserWise.message = "loading"
            })
            .addCase(getAssignedTicketList.rejected, (state) => {
                state.AssignedListUserWise.status = 2
                state.AssignedListUserWise.message = "getting error"
            })
            .addCase(getAssignedTicketList.fulfilled, (state, { payload }) => {
                state.AssignedListUserWise.AssignedList = payload
                state.AssignedListUserWise.message = "success"
                state.AssignedListUserWise.status = 1
            })
            .addCase(getAssistTicketList.pending, (state) => {
                state.AssitanceListUserWise.status = 0
                state.AssitanceListUserWise.message = "loading"
            })
            .addCase(getAssistTicketList.rejected, (state) => {
                state.AssitanceListUserWise.status = 2
                state.AssitanceListUserWise.message = "getting error"
            })
            .addCase(getAssistTicketList.fulfilled, (state, { payload }) => {
                const count = Object.keys(payload).length;
                state.ticketCount.assistTicketCount = count
                state.AssitanceListUserWise.assistanceList = payload
                state.ticketCount.message = "success"
                state.ticketCount.status = 1
            })
            .addCase(getTheActualEmployee.pending, (state) => {
                state.actialAssignedEmpList.message = "loading"
                state.actialAssignedEmpList.status = 0
            })
            .addCase(getTheActualEmployee.rejected, (state) => {
                state.actialAssignedEmpList.status = 2
                state.actialAssignedEmpList.message = "getting error"
            })
            .addCase(getTheActualEmployee.fulfilled, (state, { payload }) => {
                state.actialAssignedEmpList.status = 1
                state.actialAssignedEmpList.message = "success"
                state.actialAssignedEmpList.actEmpList = payload
            })
    }
})

export {
    getNotAssignedComplaintList,
    getAssignedTicketList,
    getAssistTicketList,
    getTheActualEmployee,
}

export const {
    assignedOnluyCount,
    assignedListOnly,
    forVerifyLists,
    totalVerifyCOunts,
    ohHoldLists,
    onHoldCOunts,
    onProgressLists
} = complaintMangementSlice.actions


export default complaintMangementSlice.reducer