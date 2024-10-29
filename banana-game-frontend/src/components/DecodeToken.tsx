export interface DecodedToken {
  exp: number;
  iat: number;
  username: string;
}

const base64UrlDecode = (str: string): string => {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  
  switch (base64.length % 4) {
    case 0: break;
    case 2: base64 += '=='; break;
    case 3: base64 += '='; break;
    default: throw new Error("Invalid Base64 string.");
  }

  return atob(base64);
};

export const decodeToken = (token: string | null): DecodedToken | null => {
  if (!token) {
    return null;
  }
  try {
    const base64Url = token.split(".")[1];
    const base64String = base64UrlDecode(base64Url);
    const decodedPayload = JSON.parse(base64String);
    
    return decodedPayload as DecodedToken;
  } catch (error) {
    console.error("Token decoding error:", error);
    return null;
  }
};

export const token = localStorage.getItem("accessToken");

export const decodedToken = decodeToken(token || "");


export const username = decodedToken ? decodedToken.username : null; 
