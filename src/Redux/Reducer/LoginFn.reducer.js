import { ActionType } from "../Constants/action.type";

const {
  FETCH_LOGIN_INFORMATION,
  FETCH_PUSH_TOKEN
} = ActionType;

const initialLoginState = {
  token: null,
  loginDetl: {},
  message: "",
  lodingStatus: false,
};

export const loginFuntion = (state = initialLoginState, { type, payload }) => {
  switch (type) {
    case FETCH_LOGIN_INFORMATION:
      return {
        ...state,
        token: payload.token,
        loginDetl: payload.data,
        message: payload.message,
        loadingStatus: payload.loadingStatus,
      };
    default:
      return state;
  }
};

const pushToken = {}

export const expoPushToken = (state = pushToken, { type, payload }) => {
  switch (type) {
    case FETCH_PUSH_TOKEN:
      return { ...state, payload };
    default:
      return state;
  }
}


