import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosResponse } from "axios";

interface Game {
  question: string;
  solution: number;
}


const useGameData = () => {
  const token = localStorage.getItem("accessToken");

  // Abstraction: Hides the API request details, only exposing the fetched data.
  const fetchGameData = async () => {
    const response: AxiosResponse<Game> = await apiClient.get("/banana_api", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  // Encapsulation: The hook manages query states (data, loading, error) internally.
  const {
    data: gameData,
    isLoading: loading,
    isError,
    error,
    refetch,
  } = useQuery<Game, Error>({
    queryKey: ["gameData"],
    queryFn: fetchGameData,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Return encapsulated states to be used in components.
  return { gameData, loading, isError, error, refetch };
};

export default useGameData;
