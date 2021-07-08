import { call, put } from "redux-saga/effects";
import { actionTypes } from "../../../common/enum/action-types.enum";
import { AuthService } from "../../../services";
import { TokenHelper } from "../../../helpers";

export function* loginSagaWorker(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(AuthService.login, { email, password });
    TokenHelper.saveToken(response.data.accessToken);

    yield put({
      type: actionTypes.SET_USER,
      payload: { user: response.data.user },
    });
  } catch (e) {
    console.log(e?.response?.data?.message);
  }
}

export function* logoutSagaWorker() {
  try {
    yield call(AuthService.logout);
    TokenHelper.removeToken();
    yield put({ type: actionTypes.SET_USER, payload: { user: null } });
  } catch (e) {
    console.log(e?.response?.data?.message);
  }
}

export function* registrationSagaWorker(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(AuthService.registration, { email, password });
    TokenHelper.saveToken(response.data.accessToken);
    yield put({
      type: actionTypes.SET_USER,
      payload: { user: response.data.user },
    });
  } catch (e) {
    console.log(e?.response?.data?.message);
  }
}

export function* checkAuth() {
  try {
    const response = yield call(AuthService.checkAuth);
    TokenHelper.saveToken(response.data.accessToken);
    yield put({
      type: actionTypes.SET_USER,
      payload: { user: response.data.user },
    });
  } catch (e) {
    //if token expired logout
    if (e.response.status === 401) {
      yield put({ type: actionTypes.LOGOUT });
    }
    console.log("e.status", e.response.status);
  }
}
