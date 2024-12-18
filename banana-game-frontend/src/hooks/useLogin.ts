import { create } from "zustand";
import { NavigateFunction } from "react-router-dom";
import { AxiosError } from "axios";
import apiClient from "../services/api-client";

interface LoginFormState {
  formErrors: { [key: string]: string };
  authError: string | null;
  isLoading: boolean;
  login: (
    formData: { email: string; password: string },
    navigate: NavigateFunction
  ) => Promise<void>;
}

export const useLogin = create<LoginFormState>((set) => ({
  formErrors: {},
  authError: null,
  isLoading: false,

  login: async (formData, navigate) => {
    const errors: { [key: string]: string } = {};

    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";

  
    if (Object.keys(errors).length > 0) {
      set({ formErrors: errors, authError: null });
      return;
    }

    set({ isLoading: true, formErrors: {}, authError: null });

    try {
      const response = await apiClient.post("/login", {
        email: formData.email,
        password: formData.password,
      }, {
        headers: { "Content-Type": "application/json" },
      });

  
      if (response.status === 200) {
        const { access_token } = response.data;
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("email", formData.email);
        navigate("/home");
      } else {
        set({
          authError: "Unexpected response. Please try again later.",
        });
      }
    } catch (error: unknown) {
      
      const err = error as AxiosError<{ detail: string }>;
      console.error(err);
      set({
        authError: err.response?.data?.detail || "Invalid credentials. Please try again.",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
