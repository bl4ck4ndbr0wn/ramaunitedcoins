import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import tokenReducer from "./tokenReducer";
import settingReducer from "./settingReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  token: tokenReducer,
  setting: settingReducer
});
