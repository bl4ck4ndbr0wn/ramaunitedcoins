import axios from "axios";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_REFERRED,
  GET_PROFILE_BY_ID,
  PROFILE_SUCCESS,
  GET_PROFILE_DETAILS
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/v1/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/v1/profile/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Get current refferals
export const getMyRefferals = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/v1/profile/referred")
    .then(res =>
      dispatch({
        type: GET_REFERRED,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_REFERRED,
        payload: {}
      })
    );
};

// Get profile by user_id
export const getProfileByUserId = user_id => dispatch => {
  axios
    .get(`/api/v1/profile/user/${user_id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE_BY_ID,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE_BY_ID,
        payload: null
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/v1/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update or create Profile
export const updateProfile = (profileData, id) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .post(`/api/v1/admin/profile/${id}`, profileData)
    .then(res =>
      dispatch({
        type: GET_PROFILE_DETAILS,
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

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/v1/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/v1/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
// Profile Success
export const setProfileSuccess = () => {
  return {
    type: PROFILE_SUCCESS
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
