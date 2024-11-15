import { useState } from "react";
import axios, { AxiosError } from "axios";
import apiClient from "../services/api-client";

interface SignupResponse {
  success: boolean;
  message: string;
}

interface SignupError {
  message: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<SignupResponse | null>(null);

  const signup = async (formData: { full_name: string; email: string; username: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await apiClient.post<SignupResponse>("/signup", formData);
      setResponse(data);
      return data;
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axios.isAxiosError(axiosError) && axiosError.response) {
        const errorData = axiosError.response.data as SignupError;
        setError(errorData.message || "Something went wrong");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error, response };
};

export default useSignup;
