import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

// Define API request functions
export const getMatches = () => api.get("/matches");
export const postMatch = (matchData) => api.post("/matches", matchData);
export const updateMatch = (id) => api.put(`/matches/${id}`);
export const deleteMatch = (id) => api.delete(`/matches/${id}`);

export const registerUser = (userData) => {
  return api
    .post("/users", userData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error posting data:", error);
      throw error;
    });
};

export const checkLogin = (loginData) => {
  return api
    .post("/login", loginData, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      const token = response.data.token;
      const tokenExpiry = 2 * 60 * 60;
      Cookies.set("jwt", token, { expires: tokenExpiry });
      return response.data;
    })
    .catch((error) => {
      console.error("Error posting data:", error);
      throw error;
    });
};

export const getUserClub = () => {
  // gets jwt from client to be passed to backend and then be decoded
  const accessToken = Cookies.get("jwt");
  console.log(accessToken, "here");
  return api
    .get("/users/club", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data.club;
    })
    .catch((error) => {
      console.error("Error fetching user club:", error);
      throw error;
    });
};

export const getTeams = () => {
  const accessToken = Cookies.get("jwt");
  return api
    .get("/teams", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      console.log(response)
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching teams:", error);
    });
};

export const postTeam = (teamData) => {
  console.log("here");
  const accessToken = Cookies.get("jwt");
  return api
    .post("/teams", teamData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error posting teamData:", error);
      throw error;
    });
};

export const postPlayer = (playerData) => {
  const accessToken = Cookies.get("jwt");
  return api
  .post("/players", playerData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .then((response) => {
    return response.data
  })
  .catch((error) => {
    console.error("Error posting playerData:", error);
    throw error;
  });
};