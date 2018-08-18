import { GET_TOKEN, GET_TOKENS, TOKEN_LOADING } from "../actions/types";

const initialState = {
  token: null,
  tokens: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOKEN_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TOKEN:
      return {
        ...state,
        token: action.payload,
        loading: false
      };
    case GET_TOKENS:
      return {
        ...state,
        tokens: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
