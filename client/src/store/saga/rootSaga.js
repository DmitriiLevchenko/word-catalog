import { takeEvery } from "redux-saga/effects";
import { actionTypes } from "../../common/enum/action-types.enum";
import {
  checkAuth,
  loginSagaWorker,
  logoutSagaWorker,
  registrationSagaWorker,
} from "./auth";
import { getUsersSagaWorker } from "./users";

export function* sagaWatcherSaga() {

    yield takeEvery(actionTypes.LOGIN, loginSagaWorker);
    yield takeEvery(actionTypes.LOGOUT, logoutSagaWorker);
    yield takeEvery(actionTypes.REGISTRATION, registrationSagaWorker);
    yield takeEvery(actionTypes.CHECK_AUTH_STATUS, checkAuth);
    yield takeEvery(actionTypes.GET_ALL_USERS, getUsersSagaWorker);

}
