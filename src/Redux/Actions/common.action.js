import { axiosApi } from "../../config/Axiox";
import { ActionType } from "../Constants/action.type";

const {
    FETCH_DEPT_EMP,
    COMPLAINT_DEPT_NAME,
    GET_MOBILE_APP_CRED
} = ActionType;

// for get the logged department employee for complaint managemtn system
export const getEmployeeDetlLoggedDeptWise = (id) => async (dispatch) => {
    const result = await axiosApi.get(`/complaintassign/emp/${id}`);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_DEPT_EMP, payload: data })
    } else {
        dispatch({ type: FETCH_DEPT_EMP, payload: [], })
    }
}

//gret the complaint depaartment detal

export const getComplaintdeptData = () => async (dispatch) => {
    const result = await axiosApi.get(`/complaintdept/status`);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: COMPLAINT_DEPT_NAME, payload: data })
    } else {
        dispatch({ type: COMPLAINT_DEPT_NAME, payload: [], })
    }
}

// get the mobile appcred status after expo push update

export const getMobileAppCreditial = (id) => async (dispatch) => {
    const result = await axiosApi.get(`/common/mobileapp/status/${id}`);
    const { success, data } = await result.data
    if (success === 1) {
        dispatch({ type: GET_MOBILE_APP_CRED, payload: data, status: true })
    } else {
        dispatch({ type: GET_MOBILE_APP_CRED, payload: [], status: false })
    }
}