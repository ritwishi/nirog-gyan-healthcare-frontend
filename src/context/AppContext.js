import React, { createContext, useContext, useReducer } from "react";

// Initial state
const initialState = {
  user: null,
  selectedDoctor: null,
  bookingData: {
    patientName: "",
    email: "",
    phone: "",
    selectedDate: "",
    selectedTime: "",
    doctorId: null,
    notes: "",
  },
  appointments: [],
  loading: false,
  error: null,
};

// Action types
export const ActionTypes = {
  SET_USER: "SET_USER",
  SET_SELECTED_DOCTOR: "SET_SELECTED_DOCTOR",
  SET_BOOKING_DATA: "SET_BOOKING_DATA",
  ADD_APPOINTMENT: "ADD_APPOINTMENT",
  SET_APPOINTMENTS: "SET_APPOINTMENTS",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };

    case ActionTypes.SET_SELECTED_DOCTOR:
      return { ...state, selectedDoctor: action.payload };

    case ActionTypes.SET_BOOKING_DATA:
      return {
        ...state,
        bookingData: { ...state.bookingData, ...action.payload },
      };

    case ActionTypes.ADD_APPOINTMENT:
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      };

    case ActionTypes.SET_APPOINTMENTS:
      return { ...state, appointments: action.payload };

    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };

    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };

    case ActionTypes.CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Custom hook to use context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators
  const actions = {
    setUser: (user) => dispatch({ type: ActionTypes.SET_USER, payload: user }),
    setSelectedDoctor: (doctor) =>
      dispatch({ type: ActionTypes.SET_SELECTED_DOCTOR, payload: doctor }),
    setBookingData: (data) =>
      dispatch({ type: ActionTypes.SET_BOOKING_DATA, payload: data }),
    addAppointment: (appointment) =>
      dispatch({ type: ActionTypes.ADD_APPOINTMENT, payload: appointment }),
    setAppointments: (appointments) =>
      dispatch({ type: ActionTypes.SET_APPOINTMENTS, payload: appointments }),
    setLoading: (loading) =>
      dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
    setError: (error) =>
      dispatch({ type: ActionTypes.SET_ERROR, payload: error }),
    clearError: () => dispatch({ type: ActionTypes.CLEAR_ERROR }),
  };

  return (
    <AppContext.Provider value={{ ...state, ...actions }}>
      {children}
    </AppContext.Provider>
  );
};
