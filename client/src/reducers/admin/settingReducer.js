import { GET_SETTINGS, SETTING_LOADING } from "../../actions/types";

const initialState = {
  settings: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SETTING_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SETTINGS:
      return {
        ...state,
        settings: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
