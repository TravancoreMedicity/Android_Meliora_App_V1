import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosApi } from '../../config/Axiox';

// ASSIGN LIST DEPARTMENT WISE
const getAssignListDeptWise = createAsyncThunk('api/getAssignListDeptWise', (id) => {
    return axiosApi.get(`/mobileapp/assignList/deptwise/${id}`)
        .then((response) => {
            return response.data;
        })
})

// ASSIST LIST DEPARTMENT WISE
const getAssistListDeptWise = createAsyncThunk('api/getAssistListDeptWise', (id) => {
    return axiosApi.get(`/mobileapp/assistList/deptwise/${id}`)
        .then((response) => {
            return response.data;
        })
})

//ON HOLD LIST DEPARTMENT WISE
const getOnHoldListDeptWise = createAsyncThunk('api/getOnHoldListDeptWise', (id) => {
    return axiosApi.get(`/mobileapp/onHoldList/deptwise/${id}`)
        .then((response) => {
            return response.data;
        })
})

// ON HOLD BEFORE ASSIGN
const getOnHoldBeforeAssigntDeptWise = createAsyncThunk('api/getOnHoldBeforeAssigntDeptWise', (id) => {
    return axiosApi.get(`/mobileapp/onHoldBeforeAssignList/deptwise/${id}`)
        .then((response) => {
            return response.data;
        })
})

// ON ON PROGRESS LIST
const getOnProgressListDeptWise = createAsyncThunk('api/getOnProgressListDeptWise', (id) => {
    return axiosApi.get(`/mobileapp/onProgressList/deptwise/${id}`)
        .then((response) => {
            return response.data;
        })
})

//FOR VERYFY LIST DEPARTMENT WISE
const getforVerifyListDeptWise = createAsyncThunk('api/getforVerifyListDeptWise', (id) => {
    return axiosApi.get(`/mobileapp/forVerifyList/deptwise/${id}`)
        .then((response) => {
            return response.data;
        })
})

//TODAY COMPLETE LIST DEPARTMENT WISE
const getCompleteListDeptWiseToday = createAsyncThunk('api/getCompleteListDeptWiseToday', (id) => {
    return axiosApi.get(`/mobileapp/completeList/deptwise/${id}`)
        .then((response) => {
            return response.data;
        })
})

//SUPER VISOR VERIFICATION LIST AFTER COMPLETION
const getSecondLevelVerificationList = createAsyncThunk('api/getSecondLevelVerificationList', (id) => {
    return axiosApi.get(`/mobileapp/forSuperVerifyList/deptwise/${id}`)
        .then((response) => {
            return response.data;
        })
})

//DEPARTMENT WISE STATISTIC
const getDepartmentWiseTicketCount = createAsyncThunk('api/getDepartmentWiseTicketCount', (id) => {
    return axiosApi.get(`/mobileapp/getComDetlcountdeptwise/${id}`)
        .then((response) => {
            return response.data;
        })
})

//EMPLOYEE WISE STATISTICS
const getEmpTicketStatistic = createAsyncThunk('api/getEmpTicketStatistic', (id) => {
    return axiosApi.get(`/mobileapp/getCountCompEmpBasedDept/${id}`)
        .then((response) => {
            return response.data;
        })
})



const initialState = {
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
    onHoldBeforeAssignList: {
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
    secondLevelList: {
        data: [],
        status: 0,
        message: ""
    },
    departmentCountList: {
        data: [],
        status: 0,
        message: ""
    },
    empCountList: {
        data: [],
        status: 0,
        message: ""
    },
}


const ticketMagmentDeptSlice = createSlice({
    name: 'ticketMagmentDeptSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAssignListDeptWise.pending, (state) => {
                state.assignList.status = 0
                state.assignList.message = "Pending...."
            })
            .addCase(getAssignListDeptWise.rejected, (state) => {
                state.assignList.status = 2
                state.assignList.message = "Error...."
            })
            .addCase(getAssignListDeptWise.fulfilled, (state, { payload }) => {
                state.assignList.status = 1
                state.assignList.message = "Success"
                state.assignList.data = payload
            })
            .addCase(getAssistListDeptWise.pending, (state) => {
                state.assistList.status = 0
                state.assistList.message = "Pending...."
            })
            .addCase(getAssistListDeptWise.rejected, (state) => {
                state.assistList.status = 2
                state.assistList.message = "Error...."
            })
            .addCase(getAssistListDeptWise.fulfilled, (state, { payload }) => {
                state.assistList.status = 1
                state.assistList.message = "Success"
                state.assistList.data = payload
            })
            .addCase(getOnHoldListDeptWise.pending, (state) => {
                state.onHoldList.status = 0
                state.onHoldList.message = "Pending...."
            })
            .addCase(getOnHoldListDeptWise.rejected, (state) => {
                state.onHoldList.status = 2
                state.onHoldList.message = "Error...."
            })
            .addCase(getOnHoldListDeptWise.fulfilled, (state, { payload }) => {
                state.onHoldList.status = 1
                state.onHoldList.message = "Success"
                state.onHoldList.data = payload
            })
            .addCase(getOnHoldBeforeAssigntDeptWise.pending, (state) => {
                state.onHoldBeforeAssignList.status = 0
                state.onHoldBeforeAssignList.message = "Pending...."
            })
            .addCase(getOnHoldBeforeAssigntDeptWise.rejected, (state) => {
                state.onHoldBeforeAssignList.status = 2
                state.onHoldBeforeAssignList.message = "Error...."
            })
            .addCase(getOnHoldBeforeAssigntDeptWise.fulfilled, (state, { payload }) => {
                state.onHoldBeforeAssignList.status = 1
                state.onHoldBeforeAssignList.message = "Success"
                state.onHoldBeforeAssignList.data = payload
            })
            .addCase(getOnProgressListDeptWise.pending, (state) => {
                state.onProgressList.status = 0
                state.onProgressList.message = "Pending...."
            })
            .addCase(getOnProgressListDeptWise.rejected, (state) => {
                state.onProgressList.status = 2
                state.onProgressList.message = "Error...."
            })
            .addCase(getOnProgressListDeptWise.fulfilled, (state, { payload }) => {
                state.onProgressList.status = 1
                state.onProgressList.message = "Success"
                state.onProgressList.data = payload
            })
            .addCase(getforVerifyListDeptWise.pending, (state) => {
                state.forVerifyList.status = 0
                state.forVerifyList.message = "Pending...."
            })
            .addCase(getforVerifyListDeptWise.rejected, (state) => {
                state.forVerifyList.status = 2
                state.forVerifyList.message = "Error...."
            })
            .addCase(getforVerifyListDeptWise.fulfilled, (state, { payload }) => {
                state.forVerifyList.status = 1
                state.forVerifyList.message = "Success"
                state.forVerifyList.data = payload
            })
            .addCase(getCompleteListDeptWiseToday.pending, (state) => {
                state.completeList.status = 0
                state.completeList.message = "Pending...."
            })
            .addCase(getCompleteListDeptWiseToday.rejected, (state) => {
                state.completeList.status = 2
                state.completeList.message = "Error...."
            })
            .addCase(getCompleteListDeptWiseToday.fulfilled, (state, { payload }) => {
                state.completeList.status = 1
                state.completeList.message = "Success"
                state.completeList.data = payload
            })
            .addCase(getSecondLevelVerificationList.pending, (state) => {
                state.secondLevelList.status = 0
                state.secondLevelList.message = "Pending...."
            })
            .addCase(getSecondLevelVerificationList.rejected, (state) => {
                state.secondLevelList.status = 2
                state.secondLevelList.message = "Error...."
            })
            .addCase(getSecondLevelVerificationList.fulfilled, (state, { payload }) => {
                state.secondLevelList.status = 1
                state.secondLevelList.message = "Success"
                state.secondLevelList.data = payload
            })
            .addCase(getDepartmentWiseTicketCount.pending, (state) => {
                state.departmentCountList.status = 0
                state.departmentCountList.message = "Pending...."
            })
            .addCase(getDepartmentWiseTicketCount.rejected, (state) => {
                state.departmentCountList.status = 2
                state.departmentCountList.message = "Error...."
            })
            .addCase(getDepartmentWiseTicketCount.fulfilled, (state, { payload }) => {
                state.departmentCountList.status = 1
                state.departmentCountList.message = "Success"
                state.departmentCountList.data = payload
            })
            .addCase(getEmpTicketStatistic.pending, (state) => {
                state.empCountList.status = 0
                state.empCountList.message = "Pending...."
            })
            .addCase(getEmpTicketStatistic.rejected, (state) => {
                state.empCountList.status = 2
                state.empCountList.message = "Error...."
            })
            .addCase(getEmpTicketStatistic.fulfilled, (state, { payload }) => {
                state.empCountList.status = 1
                state.empCountList.message = "Success"
                state.empCountList.data = payload
            })
    }
})


export const secondLevelList = state => state.ticketDept.secondLevelList.data?.data;
export const secondLevelCount = state => state.ticketDept.secondLevelList.data?.data?.length;
export const getDeptWiseTicketCount = state => state.ticketDept.departmentCountList.data?.data?.[0];
export const getEmpWiseTicketCount = state => state.ticketDept.empCountList.data?.data;


export {
    getAssignListDeptWise,
    getAssistListDeptWise,
    getOnHoldListDeptWise,
    getOnHoldBeforeAssigntDeptWise,
    getOnProgressListDeptWise,
    getforVerifyListDeptWise,
    getCompleteListDeptWiseToday,
    getSecondLevelVerificationList,
    getDepartmentWiseTicketCount,
    getEmpTicketStatistic
}

export default ticketMagmentDeptSlice.reducer