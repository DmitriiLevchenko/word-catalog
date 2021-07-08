import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./reducers/rootReducer";
import { sagaWatcherSaga as sagaWather } from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagaWather);

const dispatch = store.dispatch;
export { store, dispatch };
