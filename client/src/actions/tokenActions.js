import axios from "axios";

import {
  GET_TOKENS,
  GET_TOKEN_DESC,
  GET_TOKEN,
  TOKEN_LOADING,
  GET_ERRORS
} from "./types";

// TOKEN loading
export const setTokenLoading = () => {
  return {
    type: TOKEN_LOADING
  };
};

// Get current Token
export const getCurrentTokens = () => dispatch => {
  dispatch(setTokenLoading());
  axios
    .get("/api/token")
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
export const createToken = (tokenData, history) => dispatch => {
  axios
    .post("/api/token", tokenData)
    .then(res => history.push(`/document/${res.data._id}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Upload Documents
export const documentUpload = (imageUpload, id, history) => dispatch => {
  axios
    .post(`/api/token/document/${id}`, imageUpload)
    .then(res =>
      dispatch({
        type: GET_TOKEN,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get current Token
export const getTokenDescription = id => dispatch => {
  dispatch(setTokenLoading());
  axios
    .get(`/api/token/${id}`)
    .then(res =>
      dispatch({
        type: GET_TOKEN_DESC,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TOKEN_DESC,
        payload: {}
      })
    );
};
