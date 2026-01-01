import { apiKey } from "./constants";

export const getNewIdToken = async (token) => {
  const response = await fetch(
    `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
    {
      method: "POST",
      body: JSON.stringify({
        refresh_token: token,
        grant_type: "refresh_token",
      }),
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.json();
};
