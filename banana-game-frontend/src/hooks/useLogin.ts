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

// Zustand store for handling login state, encapsulating form errors, 
// loading state, and authentication errors.
export const useLogin = create<LoginFormState>((set) => ({
  formErrors: {},
  authError: null,
  isLoading: false,

  // Abstraction: The login function abstracts the logic for form validation and API request.
  login: async (formData, navigate) => {
    const errors: { [key: string]: string } = {};

    // Abstraction: Validates form data without exposing the logic to the parent component.
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";

    // If errors are found, update the formErrors state.
    if (Object.keys(errors).length > 0) {
      set({ formErrors: errors, authError: null });
      return;
    }

    // Encapsulation: Encapsulates the loading state and error handling logic inside the store.
    set({ isLoading: true, formErrors: {}, authError: null });

    try {
      // Abstraction: Handles the API request and response handling internally.
      const response = await apiClient.post("/login", {
        email: formData.email,
        password: formData.password,
      }, {
        headers: { "Content-Type": "application/json" },
      });

      // Polymorphism: Behaves differently depending on the response status.
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
      // Polymorphism: Handles different types of errors based on the response structure.
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
