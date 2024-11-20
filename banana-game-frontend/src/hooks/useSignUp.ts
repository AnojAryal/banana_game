import { useState } from "react";
import axios, { AxiosError } from "axios";
import apiClient from "../services/api-client";

// Interface for the signup response
interface SignupResponse {
  success: boolean;
  message: string;
}

// Interface for handling signup errors
interface SignupError {
  message: string;
}

// Class to handle signup-related logic
class SignupManager {
  static async registerUser(formData: {
    full_name: string;
    email: string;
    username: string;
    password: string;
  }): Promise<SignupResponse> {
    try {
      const { data } = await apiClient.post<SignupResponse>(
        "/signup",
        formData
      );
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axios.isAxiosError(axiosError) && axiosError.response) {
        const errorData = axiosError.response.data as SignupError;
        throw new Error(
          errorData.message || "Something went wrong during signup."
        );
      }
      throw new Error("An unexpected error occurred during signup.");
    }
  }
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<SignupResponse | null>(null);

  const signup = async (formData: {
    full_name: string;
    email: string;
    username: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const result = await SignupManager.registerUser(formData);
      setResponse(result);
      return result;
    } catch (err) {
      const errorInstance = err as Error;
      setError(errorInstance.message);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error, response };
};

export default useSignup;
