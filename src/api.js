import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

// Define API request functions
export const getMatches = () => api.get("/matches");
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
  return api
    .get("/users/club", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
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
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching teams:", error);
    });
};

export const postTeam = (teamData) => {
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
      return response.data;
    })
    .catch((error) => {
      console.error("Error posting playerData:", error);
      throw error;
    });
};

export const getPlayers = async (team) => {
  const accessToken = Cookies.get("jwt");
  const teamId = team;
  return api
    .get("/players", {
      params: { teamId },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching players:", error);
    });
};

export const postMatch = (matchData) => {
  const accessToken = Cookies.get("jwt");
  return api
    .post("/matches", matchData, {
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

export const updatePanel = (matchId, playerId) => {
  const accessToken = Cookies.get("jwt");
  const data = {
    playerId: [playerId],
  };
  return api
    .patch(`/matches/${matchId}/addPlayers`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch();
};

export const getMatchById = async (matchId) => {
  const accessToken = Cookies.get("jwt");
  const id = matchId;
  return api
    .get(`/matches/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching match by id:", error);
    });
};

export const getPlayerById = async (playerId) => {
  const accessToken = Cookies.get("jwt");
  const id = playerId;
  return api
    .get(`/players/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching player by id:", error);
    });
};

export const getTeamById = (teamId) => {
  const accessToken = Cookies.get("jwt");
  return api
    .get("/teams/getTeamName", {
      params: { teamId },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error getting team by id:", error);
    });
};

export const addGoal = (playerId, matchId) => {
  const accessToken = Cookies.get("jwt");
  const data = {
    playerId,
  };
  const id = matchId;
  return api
    .patch(`/matches/${id}/addGoal`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding goal:", error);
    });
};

export const addPoint = (playerId, matchId) => {
  const accessToken = Cookies.get("jwt");
  const data = {
    playerId,
  };
  const id = matchId;
  return api
    .patch(`/matches/${id}/addPoint`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding point:", error);
    });
};

export const addWide = (playerId, matchId) => {
  const accessToken = Cookies.get("jwt");
  const data = {
    playerId,
  };
  const id = matchId;
  return api
    .patch(`/matches/${id}/addWide`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding wide:", error);
    });
};

// gets total goals scored by a team in a particular match
export const getTotalGoals = (matchId) => {
  const accessToken = Cookies.get("jwt");
  const id = matchId;
  return api
  .get(`/matches/${id}/totalGoals`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .then((response) => {
    return response.data
  })
  .catch((error) => {
    console.error("Error getting total goals:", error);
  });
};

// gets total goals scored by a team in a particular match
export const getTotalPoints = (matchId) => {
  const accessToken = Cookies.get("jwt");
  const id = matchId;
  return api
  .get(`/matches/${id}/totalPoints`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .then((response) => {
    return response.data
  })
  .catch((error) => {
    console.error("Error getting total goals:", error);
  });
};