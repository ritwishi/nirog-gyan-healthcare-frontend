import api from "./api";

export const bookingService = {
  createAppointment: async (appointmentData) => {
    try {
      const response = await api.post("/appointments", appointmentData);
      return response;
    } catch (error) {
      throw new Error("Failed to create appointment");
    }
  },

  getUserAppointments: async (userId) => {
    try {
      const response = await api.get(`/appointments/user/${userId}`);
      return response;
    } catch (error) {
      throw new Error("Failed to fetch appointments");
    }
  },

  cancelAppointment: async (appointmentId) => {
    try {
      const response = await api.patch(`/appointments/${appointmentId}/cancel`);
      return response;
    } catch (error) {
      throw new Error("Failed to cancel appointment");
    }
  },

  getDoctorAvailability: async (doctorId, date) => {
    try {
      const response = await api.get(
        `/doctors/${doctorId}/availability?date=${date}`
      );
      return response;
    } catch (error) {
      throw new Error("Failed to fetch availability");
    }
  },
};
