import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

// Define API request functions
// export const updateMatch = (id) => api.put(`/matches/${id}`);

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

// checks to see if the email and password provided return true and allow a user to login, creating a cookie to store session in browser
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

// get user's club
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

// get user's teams
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

// create new team
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

// create new player
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

// gets players for a team
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

// creates a new match
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

// create the panel for a team through a patch request to backend
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

// gets one match
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

// gets one player
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

// gets one team
export const getTeamNameById = (teamId) => {
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

// records a goal scored by a player
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

// records a point scored by a player
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

// records a players wide
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

// gets total goals scored by a team in a match
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
      return response.data;
    })
    .catch((error) => {
      console.error("Error getting total goals:", error);
    });
};

// gets total goals scored by a player in all their matches
// export const getPlayerGoals = (playerId) => {
//   const accessToken = Cookies.get("jwt");
//   const id = playerId;
//   return api
//     .get(`/matches/${id}/totalPlayerGoals`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error("Error getting total goals:", error);
//     });
// };

// gets total points scored by a team in a particular match
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
      return response.data;
    })
    .catch((error) => {
      console.error("Error getting total goals:", error);
    });
};

// gets all user's matches
export const getMatches = () => {
  const accessToken = Cookies.get("jwt");
  return api
    .get("/matches", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error getting matches:", error);
    });
};

// gets all players matches
export const getPlayersMatches = (playerId) => {
  const accessToken = Cookies.get("jwt");
  const id = playerId;
  console.log(id)
  return api
    .get(`/matches/player/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error getting matches:", error);
    });
}

// records opponents total points in a match
export const addOpponentPoints = (id, pointsAgainst) => {
  const accessToken = Cookies.get("jwt");
  const matchId = id;
  console.log("matchid", matchId);
  const data = {
    pointsAgainst,
  };
  console.log("point data:", data);
  return api
    .patch(`/matches/${matchId}/addOpponentPoints`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding opponent points:", error);
    });
};

// records opponents total goals in a match
export const addOpponentGoals = (id, goalsAgainst) => {
  const accessToken = Cookies.get("jwt");
  const matchId = id;
  const data = {
    goalsAgainst,
  };
  return api
    .patch(`/matches/${matchId}/addOpponentGoals`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding opponent goals:", error);
    });
};

// deletes a match
export const deleteMatch = (id) => api.delete(`/matches/${id}`);

// deletes a match
export const deleteTeam = (id) => api.delete(`/teams/${id}`);

// gets one team
export const getTeamById = (id) => {
  const accessToken = Cookies.get("jwt");
  const teamId = id;
  return api
  .get(`teams/${teamId}`, {
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