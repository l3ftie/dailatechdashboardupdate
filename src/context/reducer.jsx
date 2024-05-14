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
import { initialState } from "./appContext";

const reducer = (state, action) => {
  //
  // display alert
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  //   clear alert
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  // login action
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  // login success
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Logged in successfully, Redirecting...",
    };
  }

  // login error
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // logout user
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }

  // all stats begin
  if (action.type === ALL_STATE_BEGIN) {
    return { ...state, isLoading: true };
  }

  // stats success
  if (action.type === ALL_STATE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      allStats: action.payload.stats,
    };
  }

  if (action.type === ALL_STATE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // get all recent bookings
  if (action.type === GET_RECENT_BOOKING_BEGIN) {
    return { ...state, isLoading: true };
  }

  // recent booking success
  if (action.type === GET_RECENT_BOOKING_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      recentBookings: action.payload.recent,
    };
  }

  // recent booking error
  if (action.type === GET_RECENT_BOOKING_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // get all recent provider
  if (action.type === GET_RECENT_PROVIDERS_BEGIN) {
    return { ...state, isLoading: true };
  }

  // recent provider success
  if (action.type === GET_RECENT_PROVIDERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      recentProviders: action.payload.recent,
    };
  }

  // recent provider error
  if (action.type === GET_RECENT_PROVIDERS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // get selected booking
  if (action.type === SELECTED_BOOKINGS_VIEW_BEGIN) {
    return { ...state, isLoading: true };
  }

  // recent provider success
  if (action.type === SELECTED_BOOKINGS_VIEW_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      selectedBookings: action.payload.selected,
    };
  }

  // recent provider error
  if (action.type === SELECTED_BOOKINGS_VIEW_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // get all clients
  if (action.type === ALL_CLIENTS_BEGIN) {
    return { ...state, isLoading: true };
  }

  // recent provider success
  if (action.type === ALL_CLIENTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      clientList: action.payload.client,
    };
  }

  // recent provider error
  if (action.type === ALL_CLIENTS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // get all providers
  if (action.type === ALL_PROVIDERS_BEGIN) {
    return { ...state, isLoading: true };
  }

  // recent provider success
  if (action.type === ALL_PROVIDERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      providerList: action.payload.providers,
    };
  }

  // recent provider error
  if (action.type === ALL_PROVIDERS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
