import isEmpty from "../../validation/is-empty";

import { USER_LOADING, GET_USERS, GET_USER } from "../../actions/types";

const initialState = {
  loading: false,
  user: null,
  users: null,
  user_by_id: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USER:
      return {
        ...state,
        user_by_id: action.payload,
        loading: false
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
