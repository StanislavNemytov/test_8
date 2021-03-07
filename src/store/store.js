import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
  withReduxStateSync,
} from "redux-state-sync";
import reducerAPI from "./reducers/reducerAPI";
import reducerAuthorization from "./reducers/reducerAuthorization";
import reducerText from "./reducers/reducerText";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const config = {};
const middlewareArr = [createStateSyncMiddleware(config), thunkMiddleware];

const rootReducer = combineReducers({
  reducerAPI,
  reducerText,
  reducerAuthorization,
});

const store = createStore(
  withReduxStateSync(rootReducer),
  composeEnhancers(applyMiddleware(...middlewareArr))
);

// eslint-disable-next-line no-underscore-dangle
window.__store__ = store;
initStateWithPrevTab(store);

export default store;
