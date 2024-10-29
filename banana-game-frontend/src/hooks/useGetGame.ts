import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { AxiosResponse } from "axios";

interface Game {
  question: string;
  solution: number;
}

const useGameData = () => {
  const [gameData, setGameData] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGameData = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse<Game> = await apiClient.get(
          "/banana_api"
        );
        setGameData(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, []);

  return { gameData, loading, error };
};

export default useGameData;
