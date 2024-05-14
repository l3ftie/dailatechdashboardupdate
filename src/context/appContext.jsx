import axios from "axios";
import { createContext, useContext, useReducer } from "react";

import { baseUrl } from "../utils/urls";
import {
  ALL_CLIENTS_BEGIN,
  ALL_CLIENTS_ERROR,
  ALL_CLIENTS_SUCCESS,
  ALL_PROVIDERS_BEGIN,
  ALL_PROVIDERS_ERROR,
  ALL_PROVIDERS_SUCCESS,
  ALL_STATE_BEGIN,
  ALL_STATE_ERROR,
  ALL_STATE_SUCCESS,
  CLEAR_ALERT,
  DISPLAY_ALERT,
  GET_RECENT_BOOKING_BEGIN,
  GET_RECENT_BOOKING_ERROR,
  GET_RECENT_BOOKING_SUCCESS,
  GET_RECENT_PROVIDERS_BEGIN,
  GET_RECENT_PROVIDERS_ERROR,
  GET_RECENT_PROVIDERS_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  SELECTED_BOOKINGS_VIEW_BEGIN,
  SELECTED_BOOKINGS_VIEW_ERROR,
  SELECTED_BOOKINGS_VIEW_SUCCESS,
} from "./actions";
import reducer from "./reducer";

const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  allStats: {},
  selectedBookings: [],
  clientList: [],
  providerList: [],
  recentBookings: [],
  recentProviders: [],
  modalRecentContent: null,
  isModalOpen: true,
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: "",
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  // request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        // logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user }) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUserToLocalStorage = () => {
    localStorage.removeItem("user");
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserToLocalStorage();
  };

  // login user
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post(`${baseUrl.dev}/api/admin/login`, currentUser);
      const user = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user },
      });
      addUserToLocalStorage({ user });
      // localStorage add here
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    clearAlert();
  };

  // get all stats
  const getAllStats = async () => {
    dispatch({ type: ALL_STATE_BEGIN });
    try {
      const { data } = await axios.get(`${baseUrl.dev}/api/admin/allStats`);
      const stats = data;
      dispatch({ type: ALL_STATE_SUCCESS, payload: { stats } });
    } catch (error) {
      dispatch({
        type: ALL_STATE_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
  };

  const getRecentBookings = async () => {
    dispatch({ type: GET_RECENT_BOOKING_BEGIN });
    try {
      const { data } = await axios.get(`${baseUrl.dev}/api/booking/current`);
      const recent = data;
      dispatch({ type: GET_RECENT_BOOKING_SUCCESS, payload: { recent } });
    } catch (error) {
      dispatch({
        type: GET_RECENT_BOOKING_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
  };

  const getRecentProviders = async () => {
    dispatch({ type: GET_RECENT_PROVIDERS_BEGIN });
    try {
      const { data } = await axios.get(`${baseUrl.dev}/api/provider/recent`);
      const recent = data;
      dispatch({ type: GET_RECENT_PROVIDERS_SUCCESS, payload: { recent } });
    } catch (error) {
      dispatch({
        type: GET_RECENT_PROVIDERS_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
  };

  const getSelectedBookingsView = async (status) => {
    dispatch({ type: SELECTED_BOOKINGS_VIEW_BEGIN });
    try {
      const { data } = await axios.get(`${baseUrl.dev}/api/booking/status/${status}`);
      const selected = data;
      dispatch({ type: SELECTED_BOOKINGS_VIEW_SUCCESS, payload: { selected } });
    } catch (error) {
      dispatch({
        type: SELECTED_BOOKINGS_VIEW_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
  };

  const getClientList = async () => {
    dispatch({ type: ALL_CLIENTS_BEGIN });
    const { data } = await axios.get(`${baseUrl.dev}/api/client`);
    const client = data;
    dispatch({ type: ALL_CLIENTS_SUCCESS, payload: { client } });
    try {
    } catch (error) {
      dispatch({ type: ALL_CLIENTS_ERROR, payload: { msg: error.response.data.message } });
    }
  };

  const getProviderList = async () => {
    dispatch({ type: ALL_PROVIDERS_BEGIN });
    const { data } = await axios.get(`${baseUrl.dev}/api/provider`);
    const providers = data;
    dispatch({ type: ALL_PROVIDERS_SUCCESS, payload: { providers } });
    try {
    } catch (error) {
      dispatch({ type: ALL_PROVIDERS_ERROR, payload: { msg: error.response.data.message } });
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        loginUser,
        logoutUser,
        getAllStats,
        getRecentBookings,
        getRecentProviders,
        getProviderList,
        getClientList,
        getSelectedBookingsView,
        displayAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
