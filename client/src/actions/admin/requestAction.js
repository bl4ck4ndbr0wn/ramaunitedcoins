import axios from "axios";

import {
  GET_TOKENS,
  GET_TOKEN,
  TOKEN_LOADING,
  GET_ERRORS,
  UPLOAD_PROGRESS
} from "../types";

// TOKEN loading
export const setTokenLoading = () => {
  return {
    type: TOKEN_LOADING
  };
};

// Get all Token
export const getAllTokens = () => dispatch => {
  dispatch(setTokenLoading());
  axios
    .get("/api/v1/admin/request")
    .then(res =>
      dispatch({
        type: GET_TOKENS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TOKENS,
        payload: {}
      })
    );
};

// Create Token
export const requestTokens = (tokenData, history) => dispatch => {
  axios
    .post("/api/v1/admin/request", tokenData)
    .then(res => console.log(res))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// history.push(`/admin/requests`)
