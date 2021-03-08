import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import reducerAPI from "./reducers/reducerAPI";
import reducerAuthorization from "./reducers/reducerAuthorization";
import reducerText from "./reducers/reducerText";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  reducerAPI,
  reducerText,
  reducerAuthorization,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

// eslint-disable-next-line no-underscore-dangle
window.__store__ = store;

export default store;
