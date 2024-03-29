import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER, USER_LOADING, GET_USERS } from "../actions/types";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  users: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
