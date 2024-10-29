import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosResponse } from "axios";

interface Game {
  question: string;
  solution: number;
}

const useGameData = () => {
  const token = localStorage.getItem("accessToken");

  const fetchGameData = async () => {
    const response: AxiosResponse<Game> = await apiClient.get("/banana_api", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

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
  });

  return { gameData, loading, isError, error, refetch };
};

export default useGameData;
