import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

// register a new user
export const registerUser = (userData) => {
  return api
    .post("/users", userData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error posting data:", error);
      throw error;
    });
};

// check to see if the email and password provided return true and allow a user to login, cookie created in server to store session in browser
export const checkLogin = (loginData) => {
  return api
    .post("/login", loginData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error posting data:", error);
      throw error;
    });
};

// get user's club
export const getUserClub = () => {
  return api
    .get("/users/club", {
      withCredentials: true,
    })
    .then((response) => {
      return response.data.club;
    })
    .catch((error) => {
      console.error("Error fetching user club:", error);
      throw error;
    });
};

// get user's teams
export const getTeams = () => {
  return api
    .get("/teams", {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching teams:", error);
    });
};

// create new team
export const postTeam = (teamData) => {
  return api
    .post("/teams", teamData, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error posting teamData:", error);
      throw error;
    });
};

// create new player
export const postPlayer = (playerData) => {
  return api
    .post("/players", playerData, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error posting playerData:", error);
      throw error;
    });
};

// gets players for a team
export const getPlayers = async (team) => {
  const teamId = team;
  return api
    .get("/players", {
      params: { teamId },
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching players:", error);
    });
};

// creates a new match
export const postMatch = (matchData) => {
  return api
    .post("/matches", matchData, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error posting teamData:", error);
      throw error;
    });
};

// create the panel for a team through a patch req
export const updatePanel = (matchId, playerId) => {
  const data = {
    playerId: [playerId],
  };
  return api
    .patch(`/matches/${matchId}/addPlayers`, data, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch();
};

// gets one match
export const getMatchById = async (matchId) => {
  const id = matchId;
  return api
    .get(`/matches/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching match by id:", error);
    });
};

// gets one player
export const getPlayerById = async (playerId) => {
  const id = playerId;
  return api
    .get(`/players/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching player by id:", error);
    });
};

// records a goal scored by a player from play
export const addGoalPlay = (playerId, matchId) => {
  const data = {
    playerId,
  };
  const id = matchId;
  return api
    .patch(`/matches/${id}/addGoal`, data, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding goal:", error);
    });
};

// records a goal scored by a player from dead ball
export const addGoalDead = (playerId, matchId) => {
  const data = {
    playerId,
  };
  const id = matchId;
  return api
    .patch(`/matches/${id}/addGoalDead`, data, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding goal:", error);
    });
};

// records a point scored by a player from play
export const addPointPlay = (playerId, matchId) => {
  const data = {
    playerId,
  };
  const id = matchId;
  return api
    .patch(`/matches/${id}/addPoint`, data, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding point:", error);
    });
};

// records a point scored by a player from dead ball
export const addPointDead = (playerId, matchId) => {
  const data = {
    playerId,
  };
  const id = matchId;
  return api
    .patch(`/matches/${id}/addPointDead`, data, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding point:", error);
    });
};

// records a player's wide
export const addWide = (playerId, matchId) => {
  const data = {
    playerId,
  };
  const id = matchId;
  return api
    .patch(`/matches/${id}/addWide`, data, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding wide:", error);
    });
};

// records a player's block
export const addBlock = (playerId, matchId) => {
  const data = {
    playerId,
  };
  const id = matchId;
  return api
    .patch(`/matches/${id}/addBlock`, data, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding wide:", error);
    });
};

// records a player's catch
export const addCatch = (playerId, matchId) => {
  const data = {
    playerId,
  };
  const id = matchId;
  return api
    .patch(`/matches/${id}/addCatch`, data, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding wide:", error);
    });
};

// records a player's dropped ball
export const addDrop = (playerId, matchId) => {
  const data = {
    playerId,
  };
  const id = matchId;
  return api
    .patch(`/matches/${id}/addDrop`, data, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding wide:", error);
    });
};

// gets total goals scored by a team in a match
export const getTotalGoals = (matchId) => {
  const id = matchId;
  return api
    .get(`/matches/${id}/totalGoals`, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error getting total goals:", error);
    });
};

// gets total points scored by a team in a match
export const getTotalPoints = (matchId) => {
  const id = matchId;
  return api
    .get(`/matches/${id}/totalPoints`, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error getting total goals:", error);
    });
};

// gets all user's matches
export const getMatches = () => {
  return api
    .get("/matches", {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error getting matches:", error);
    });
};

// gets all of a player's matches
export const getPlayersMatches = (playerId) => {
  const id = playerId;
  return api
    .get(`/matches/player/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error getting matches:", error);
    });
};

// records opponent's total points in a match
export const addOpponentPoints = (id, pointsAgainst) => {
  const matchId = id;
  const data = {
    pointsAgainst,
  };
  return api
    .patch(`/matches/${matchId}/addOpponentPoints`, data, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding opponent points:", error);
    });
};

// records opponent's total goals in a match
export const addOpponentGoals = (id, goalsAgainst) => {
  const matchId = id;
  const data = {
    goalsAgainst,
  };
  return api
    .patch(`/matches/${matchId}/addOpponentGoals`, data, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding opponent goals:", error);
    });
};

// deletes a match
export const deleteMatch = (id) => api.delete(`/matches/${id}`, {
  withCredentials: true,
});

// deletes a team
export const deleteTeam = (id) => api.delete(`/teams/${id}`, {
  withCredentials: true,
});

// gets one team
export const getTeamById = (id) => {
  const teamId = id;
  return api
    .get(`teams/${teamId}`, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error getting team by id:", error);
    });
};

export const logout = async () => {
  try {
    const response = await api.post("/login/logout", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
