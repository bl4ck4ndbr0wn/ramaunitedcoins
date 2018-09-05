import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_REFERRED,
  GET_PROFILE_BY_ID,
  PROFILE_SUCCESS,
  GET_PROFILE_DETAILS
} from "../actions/types";

const initialState = {
  profile: null,
  profile_by_id: null,
  profiles: null,
  referrals: null,
  success_message: "",
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        success_message: ""
      };
    case GET_PROFILE_BY_ID:
      return {
        ...state,
        profile_by_id: action.payload,
        loading: false
      };
    case GET_PROFILE_DETAILS:
      return {
        ...state,
        profile_by_id: action.payload,
        loading: false,
        success_message: "Successfully Updated."
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case GET_REFERRED:
      return {
        ...state,
        referrals: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
