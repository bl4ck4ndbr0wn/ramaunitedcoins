import isEmpty from "../../validation/is-empty";

import { USER_LOADING, GET_USERS } from "../../actions/types";

const initialState = {
  loading: false,
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
