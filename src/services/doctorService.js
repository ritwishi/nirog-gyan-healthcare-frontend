import api from "./api";

export const doctorService = {
  getAllDoctors: async () => {
    try {
      const response = await api.get("/doctors");
      return response;
    } catch (error) {
      throw new Error("Failed to fetch doctors");
    }
  },

  getDoctorById: async (id) => {
    try {
      const response = await api.get(`/doctors/${id}`);
      return response;
    } catch (error) {
      throw new Error("Failed to fetch doctor details");
    }
  },

  searchDoctors: async (query) => {
    try {
      const response = await api.get(`/doctors/search?q=${query}`);
      return response;
    } catch (error) {
      throw new Error("Failed to search doctors");
    }
  },

  getDoctorsBySpecialization: async (specialization) => {
    try {
      const response = await api.get(
        `/doctors/specialization/${specialization}`
      );
      return response;
    } catch (error) {
      throw new Error("Failed to filter doctors");
    }
  },
};
