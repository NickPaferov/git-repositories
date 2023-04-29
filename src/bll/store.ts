import { applyMiddleware, combineReducers, createStore } from "redux";
import { reposReducer, reposWatcherSaga } from "./reposReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

const rootReducer = combineReducers({
  repos: reposReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootWatcherSaga);

export type AppRootStateType = ReturnType<typeof rootReducer>;

function* rootWatcherSaga() {
  yield reposWatcherSaga();
}

// @ts-ignore
window.store = store;
