import {
  GET_SETTINGS,
  SETTING_LOADING,
  EXCHANGE_SUCCESS,
  EXCHANGE_FAILURE
} from "../../actions/types";

const initialState = {
  settings: null,
  loading: false,
  exchange: {},
  errors: null,
  failure: false,
  success: false
};

export default function(state = initialState, action) {
  const { payload, errors, type } = action;
  switch (type) {
    case SETTING_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SETTINGS:
      return {
        ...state,
        settings: payload,
        loading: false
      };

    case EXCHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        exchange: payload,
        success: true,
        failure: false
      };

    case EXCHANGE_FAILURE:
      return {
        ...state,
        loading: false,
        exchange: payload,
        errors,
        failure: true,
        success: false
      };
    default:
      return state;
  }
}
