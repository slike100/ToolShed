import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

import rootReducer from "./reducers/index";

export default (function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

  // return our store, passing in our root reducer, our initial state, our middleware
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
})();
