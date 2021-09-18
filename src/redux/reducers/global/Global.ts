import {
  FAILURE_STATE,
  INITIAL_STATE,
  SUCCESS_STATE,
} from "../../../constans/actionTypes";

const globalState = (state = {}, action: any) => {
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
