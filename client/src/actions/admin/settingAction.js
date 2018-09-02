import axios from "axios";

import { GET_SETTINGS, SETTING_LOADING, GET_ERRORS } from "../types";

// Get all settings
export const getSettings = () => dispatch => {
  dispatch(setSettingLoading());
  axios
    .get("/api/v1/admin/setting")
    .then(res =>
      dispatch({
        type: GET_SETTINGS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SETTINGS,
        payload: {}
      })
    );
};

// Post Account
export const createAccounts = (accountData, history) => dispatch => {
  dispatch(setSettingLoading());
  axios
    .post("/api/v1/admin/setting/account", accountData)
    .then(res => history.push("/admin/settings"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Post Distribution  distribution
export const createDistributions = (distributionData, history) => dispatch => {
  dispatch(setSettingLoading());
  axios
    .post("/api/v1/admin/setting/distribution", distributionData)
    .then(res => history.push("/admin/settings"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Setting loading
export const setSettingLoading = () => {
  return {
    type: SETTING_LOADING
  };
};
