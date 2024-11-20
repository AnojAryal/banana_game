import { create } from "zustand";
import { NavigateFunction } from "react-router-dom";
import { AxiosError } from "axios";
import apiClient from "../services/api-client";

// Class to manage login logic
class LoginManager {
  async validateForm(formData: {
    email: string;
    password: string;
  }): Promise<{ [key: string]: string }> {
    const errors: { [key: string]: string } = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    return errors;
  }

  async authenticateUser(formData: {
    email: string;
    password: string;
  }): Promise<{ access_token: string }> {
    const response = await apiClient.post(
      "/login",
      { email: formData.email, password: formData.password },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  }
}

const loginManager = new LoginManager();

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
    set({ isLoading: true, formErrors: {}, authError: null });

    try {
      // Validate form data
      const errors = await loginManager.validateForm(formData);
      if (Object.keys(errors).length > 0) {
        set({ formErrors: errors, isLoading: false });
        return;
      }

      // Authenticate user
      const { access_token } = await loginManager.authenticateUser(formData);

      // Store token and navigate
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("email", formData.email);
      navigate("/home");
    } catch (error: unknown) {
      const err = error as AxiosError<{ detail: string }>;
      console.error(err);
      set({
        authError:
          err.response?.data?.detail ||
          "Invalid credentials. Please try again.",
        isLoading: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
