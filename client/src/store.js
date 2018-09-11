// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";

// const middleware = [thunk];

// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(
//   applyMiddleware(...middleware)
//   // other store enhancers if any
// );

// const store = createStore(rootReducer, {}, enhancer);

// export default store;

import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const configStore = () => {
  const middlewares = [thunk];
  return createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(...middlewares))
  );
};

export default configStore;
