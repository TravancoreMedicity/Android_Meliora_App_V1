import { ActionType } from "../Constants/action.type";

const {
    SHOW_OVERLAY_LOADING,
    FETCH_DEPT_EMP,
    COMPLAINT_DEPT_NAME,
    GET_MOBILE_APP_CRED
} = ActionType;


const overLayLoading = false

export const overLayLoadingStatus = (state = overLayLoading, { type, payload }) => {
    switch (type) {
        case SHOW_OVERLAY_LOADING:
            return { ...state, payload };
        default:
            return state;
    }
}

//GET EMPLOYEE DETAILS LOGGED DEPARTMENT ONLY FOR COMPLAINT MANAGEMENT

const loggedEmployeeCmpMagmnt = {
    empDetl: []
}

export const loggedEmployeeCmpMagmntFun = (state = loggedEmployeeCmpMagmnt, { type, payload }) => {
    switch (type) {
        case FETCH_DEPT_EMP:
            return { ...state, empDetl: payload };
        default:
            return state;
    }
}

//GET COMPANY DEPARTMENT

const companyDepartment = {
    cmpDept: [],
    status: false
}

export const getCompanyDepartment = (state = companyDepartment, { type, payload }) => {
    switch (type) {
        case COMPLAINT_DEPT_NAME:
            return { ...state, cmpDept: payload, status: true };
        default:
            return state;
    }
}

// GET THE MOBILE APP CRED STATUS 

const mobileAppCreditial = {
    creditialStatus: [],
    status: false
}

export const getMobileAppCreditial = (state = mobileAppCreditial, { type, payload }) => {
    switch (type) {
        case GET_MOBILE_APP_CRED:
            return { ...state, creditialStatus: payload, status: true };
        default:
            return state;
    }
}