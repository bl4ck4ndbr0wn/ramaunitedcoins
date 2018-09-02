import axios from "axios";

import { GET_USERS, USER_LOADING, GET_ERRORS } from "../types";

// USER loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Get all Users
export const getAllUsers = () => dispatch => {
  dispatch(setUserLoading());
  axios
    .get("/api/v1/admin/user/all")
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: null
      })
    );
};

//Register a user

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/v1/admin/user/register", userData)
    .then(res => history.push("/admin/users"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
