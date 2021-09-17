import {
  INITIAL_STATE,
  SUCCESS_STATE,
  FAILURE_STATE,
} from "../../../constans/actionTypes";

interface SystemInfo {
  loading: Boolean;
  activeCd: String;
  error: String;
  data: Object;
}

const initialState = (): SystemInfo => {
  return {
    loading: false,
    activeCd: "",
    error: "",
    data: {},
  };
};

const globalState = (state = initialState, action: any) => {
  switch (action.type) {
    case INITIAL_STATE:
      return {
        ...state,
        loading: true,
        error: "",
        data: null,
      };
    case SUCCESS_STATE:
      return {
        ...state,
        loading: false,
        error: "",
        data: action.payload,
      };
    case FAILURE_STATE:
      return {
        ...state,
        error: action.error,
        loading: false,
        data: null,
      };
    default:
      return state;
  }
};

export default globalState;
