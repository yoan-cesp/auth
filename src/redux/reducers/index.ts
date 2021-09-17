import { combineReducers } from "redux";
import Global from "./global/Global";
import Auth from "./auth/Auth";

const rootReducer = combineReducers({
  Global,
  Auth,
});

export default rootReducer;
