import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosApi } from '../../config/Axiox';

// for get the logged department employee for complaint managemtn system
const getEmployeeDetlLoggedDeptWise = createAsyncThunk('api/loggedDepartmentEmployee', (id) => {
    return axiosApi.get(`/complaintassign/emp/${id}`)
        .then((response) => {
            return response.data;
        })
})

//gret the complaint depaartment detal

const getComplaintdeptData = createAsyncThunk('api/compDeptDetails', () => {
    return axiosApi.get(`/complaintdept/status`)
        .then((response) => {
            return response.data;
        })
})

// get the mobile appcred status after expo push update
const getMobileAppCreditial = createAsyncThunk('api/monileAppCred', (id) => {
    return axiosApi.get(`/common/mobileapp/status/${id}`)
        .then((response) => {
            return response.data;
        })
})

const initialState = {
    loggedEmployeeCmpMagmnt: {
        empDetl: [],
        status: 0,
        message: ""
    },
    companyDepartment: {
        cmpDept: [],
        status: 0,
        message: ""
    },
    mobileAppCreditial: {
        creditialStatus: [],
        status: 0,
        message: ""
    },
    reduxUpdation: {
        count: 0
    }
}


const commonFunSlice = createSlice({
    name: 'commonFunSlice',
    initialState,
    reducers: {
        reduxUpdation: (state) => {
            state.reduxUpdation.count += 1
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEmployeeDetlLoggedDeptWise.pending, (state) => {
                state.loggedEmployeeCmpMagmnt.status = 0
                state.loggedEmployeeCmpMagmnt.message = "pending"
                state.loading = true
            })
            .addCase(getEmployeeDetlLoggedDeptWise.rejected, (state) => {
                state.loggedEmployeeCmpMagmnt.status = 2
                state.loggedEmployeeCmpMagmnt.message = "Error"
                state.loading = false
            }).addCase(getEmployeeDetlLoggedDeptWise.fulfilled, (state, { payload }) => {
                state.loggedEmployeeCmpMagmnt.status = payload.success
                state.loggedEmployeeCmpMagmnt.message = payload.message
                state.status = false
                state.loggedEmployeeCmpMagmnt.empDetl = payload.data
            }).addCase(getComplaintdeptData.pending, (state) => {
                state.companyDepartment.status = 0
                state.companyDepartment.message = "pending"
                state.loading = true
            }).addCase(getComplaintdeptData.rejected, (state) => {
                state.companyDepartment.status = 2
                state.companyDepartment.message = "Error"
                state.loading = false
            }).addCase(getComplaintdeptData.fulfilled, (state, { payload }) => {
                state.companyDepartment.status = payload.success
                state.companyDepartment.message = payload.message
                state.loading = false
                state.companyDepartment.cmpDept = payload.data
            }).addCase(getMobileAppCreditial.pending, (state) => {
                state.mobileAppCreditial.status = 0
                state.mobileAppCreditial.message = "pending"
                state.loading = true
            }).addCase(getMobileAppCreditial.rejected, (state) => {
                state.mobileAppCreditial.status = 2
                state.mobileAppCreditial.message = "Error"
                state.loading = false
            }).addCase(getMobileAppCreditial.fulfilled, (state, { payload }) => {
                state.mobileAppCreditial.status = payload.success
                state.mobileAppCreditial.message = payload.message
                state.loading = false
                state.mobileAppCreditial.creditialStatus = payload.data
            })
    }
})

export {
    getEmployeeDetlLoggedDeptWise,
    getComplaintdeptData,
    getMobileAppCreditial
}

export const getLoggeedEmpList = state => state.commonFun.loggedEmployeeCmpMagmnt.empDetl;
export const reduxUpdate = state => state.commonFun.reduxUpdation.count;
export const complaintDepartmentSliceData = (state) => {
    const cmpDeptData = state.commonFun.companyDepartment?.cmpDept;
    return cmpDeptData?.map((e) => {
        return {
            id: e.complaint_dept_slno,
            label: e.complaint_dept_name,
            value: e.complaint_dept_slno
        }
    })
}
export const getMobileAppCred = state => state.commonFun.mobileAppCreditial.creditialStatus

export const { reduxUpdation } = commonFunSlice.actions

export default commonFunSlice.reducer