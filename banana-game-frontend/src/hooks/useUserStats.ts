import apiClient from "../services/api-client";

interface UserStats {
  totalGamesPlayed: number;
  lastPlayed: string;
}

const token = localStorage.getItem("accessToken");

const getUserStats = async (user_id: string): Promise<UserStats> => {
  try {
    const response = await apiClient.get(`/users/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      return { totalGamesPlayed: 0, lastPlayed: "" };
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching user stats:", error);
    throw new Error("Error fetching user stats.");
  }
};

const updateUserStats = async (
  user_id: string,
  totalGamesPlayed: number,
  lastPlayed: string,
): Promise<UserStats> => {
  try {
    console.log("Updating user stats...");
    const response = await apiClient.patch(
      `/users/${user_id}`,
      {
        totalGamesPlayed,
        lastPlayed,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user stats:", error);
    throw new Error("Error updating user stats.");
  }
};

export { getUserStats, updateUserStats };
