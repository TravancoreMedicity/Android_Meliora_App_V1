import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginInfo: {
    token: null,
    loginDetl: {},
    message: "",
    lodingStatus: false,
  },
};

export const loginFuntion = createSlice({
  name: "LoginInf",
  initialState,
  reducers: {
    loggedInfomration: (state, { payload }) => {
      state.loginInfo = {
        ...state.loginInfo,
        token: payload.token,
        loginDetl: payload,
        message: payload.message,
        loadingStatus: false,
      };
    },
    clearLoggedInformation: (state) => {
      state.loginInfo = {
        token: null,
        loginDetl: {},
        message: "",
        lodingStatus: false,
      };
    },
    authenticatedLoginStatus: (state, { payload }) => {
      state.loginInfo = {
        ...state.loginInfo,
        lodingStatus: payload.loginStatus,
      };
    },
  },
});

export const selectLoginInform = createSelector(
  [(state) => state.loginFuntion.loginInfo.loginDetl],
  (loginDetl) => loginDetl
);

export const getLogiEmployeeID = createSelector(
  [(state) => state.loginFuntion.loginInfo.loginDetl?.emp_id],
  (emp_id) => emp_id
);

export const getLogiEmpDEPT = createSelector(
  [(state) => state.loginFuntion.loginInfo.loginDetl?.emp_dept],
  (emp_dept) => emp_dept
);

export const getSuperVisor = createSelector(
  [(state) => state.loginFuntion.loginInfo.loginDetl?.supervisor],
  (supervisor) => supervisor
);

export const {
  loggedInfomration,
  clearLoggedInformation,
  authenticatedLoginStatus,
} = loginFuntion.actions;

export default loginFuntion.reducer;
