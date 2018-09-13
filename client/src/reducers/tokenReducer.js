import {
  GET_TOKEN,
  GET_TOKEN_DESC,
  GET_TOKENS,
  TOKEN_LOADING,
  CLEAR_TOKENS,
  CONFIRMED_SUCCESS,
  CONFIRMED_FAILURE
} from "../actions/types";

const initialState = {
  token: null,
  tokens: null,
  token_desc: null,
  loading: false,
  errors: null,
  failure: false,
  success: false
};

export default function(state = initialState, action) {
  const { payload, errors, type } = action;
  switch (type) {
    case TOKEN_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_TOKENS:
      return {
        token: {}
      };
    case GET_TOKEN:
      return {
        ...state,
        token: payload,
        loading: false
      };
    case GET_TOKEN_DESC:
      return {
        ...state,
        token_desc: payload,
        loading: false
      };
    case GET_TOKENS:
      return {
        ...state,
        tokens: payload,
        token: {},
        loading: false
      };

    case CONFIRMED_SUCCESS:
      return {
        ...state,
        loading: false,
        token: payload,
        success: true,
        failure: false
      };

    case CONFIRMED_FAILURE:
      return {
        ...state,
        loading: false,
        token: payload,
        errors,
        failure: true,
        success: false
      };
    default:
      return state;
  }
}
