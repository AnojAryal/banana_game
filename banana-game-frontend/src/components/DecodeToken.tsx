export interface DecodedToken {
  exp: number;
  iat: number;
  username: string;
}

// Helper function to decode base64url to a JSON string
const base64UrlDecode = (str: string): string => {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");

  switch (base64.length % 4) {
    case 0:
      break;
    case 2:
      base64 += "==";
      break;
    case 3:
      base64 += "=";
      break;
    default:
      throw new Error("Invalid Base64 string.");
  }

  return atob(base64);
};

// Function to decode the token and check its validity
export const decodeToken = (token: string | null): DecodedToken | null => {
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64String = base64UrlDecode(base64Url);
    const decodedPayload = JSON.parse(base64String) as DecodedToken;

    // Check if token is expired
    if (isTokenExpired(decodedPayload)) {
      console.warn("Token has expired.");
      return null;
    }

    return decodedPayload;
  } catch (error) {
    console.error("Token decoding error:", error);
    return null;
  }
};

// Function to check if the token has expired
const isTokenExpired = (decodedToken: DecodedToken): boolean => {
  return decodedToken.exp * 1000 < Date.now();
};

// Retrieve the token from localStorage and decode it
export const token = localStorage.getItem("accessToken");
export const decodedToken = decodeToken(token || "");

// Retrieve the username if token is valid
export const username = decodedToken ? decodedToken.username : null;
