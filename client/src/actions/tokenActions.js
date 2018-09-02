import axios from "axios";

import {
  GET_TOKENS,
  GET_TOKEN_DESC,
  GET_TOKEN,
  TOKEN_LOADING,
  GET_ERRORS,
  CLEAR_TOKENS
} from "./types";

// TOKEN loading
export const setTokenLoading = () => {
  return {
    type: TOKEN_LOADING
  };
};

// clear tokens
export const clearTokenData = () => dispatch => {
  dispatch({
    type: GET_TOKENS,
    payload: {}
  });
};

// Get current Token
export const getCurrentTokens = () => dispatch => {
  dispatch(setTokenLoading());
  axios
    .get("/api/v1/request")
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
    .post("/api/v1/request", tokenData)
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
    .post(`/api/v1/request/document/${id}`, imageUpload)
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
    .get(`/api/v1/request/detail/${id}`)
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

// Confrim Request
export const confrimTransaction = (id, history) => dispatch => {
  dispatch(setTokenLoading());
  axios
    .post(`/api/v1/request/confirm/${id}`)
    .then(res => history.push("/transactions"))
    .catch(err =>
      dispatch({
        type: GET_TOKEN_DESC,
        payload: {}
      })
    );
};
