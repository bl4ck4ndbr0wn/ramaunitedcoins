import axios from "axios";

import { GET_TOKENS, GET_TOKEN, TOKEN_LOADING, GET_ERRORS } from "../types";

// TOKEN loading
export const setTokenLoading = () => {
  return {
    type: TOKEN_LOADING
  };
};

// Get transaction by id
export const getTokenById = id => dispatch => {
  dispatch(setTokenLoading());
  axios
    .get(`/api/v1/admin/request/${id}`)
    .then(res =>
      dispatch({
        type: GET_TOKEN,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TOKEN,
        payload: null
      })
    );
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
    .then(res => history.push(`/admin/request/document/${res.data._id}`))
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
