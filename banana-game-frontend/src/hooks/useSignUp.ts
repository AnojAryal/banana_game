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

// Custom hook for handling signup logic, encapsulating state and API interaction.
const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<SignupResponse | null>(null);

  // Abstraction: The signup function abstracts the form data validation and API request handling.
  const signup = async (formData: { full_name: string; email: string; username: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      // Abstraction: Hides the details of the API request and response handling.
      const { data } = await apiClient.post<SignupResponse>("/signup", formData);
      setResponse(data);
      return data;
    } catch (err) {
      // Polymorphism: Handles different error cases, including network or unexpected errors.
      const axiosError = err as AxiosError;
      if (axios.isAxiosError(axiosError) && axiosError.response) {
        const errorData = axiosError.response.data as SignupError;
        setError(errorData.message || "Something went wrong");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      // Encapsulation: Manages the loading state internally, 
      //only exposing the final result to the caller.
      setLoading(false);
    }
  };

  // Exposes the signup function and relevant states 
  //(loading, error, response) to the component.
  return { signup, loading, error, response };
};

export default useSignup;
