export const player1 = {
    _id: 1,
    playerId: 1,
    playerName: 'Conor Kelly',
    stats: {
        goal_from_play: 0,
        goal_from_dead: 1,
        point_from_play: 2,
        point_from_dead: 0,
        wide: 0
    }
}

export const player2 = {
    _id: 2,
    playerId: 2,
    playerName: 'Harry Potter',
    stats: {
        goal_from_play: 0,
        goal_from_dead: 1,
        point_from_play: 2,
        point_from_dead: 0,
        wide: 2
    }
}

export const playersMock = [player1, player2]; 

export const match = {
    _id: "123",
    teams: {
        teamId: "123",
        oppositionTeam: "Galway",
        players: [player1, player2]
    },
    matchDate: 8/30/2023,
    goalAgainst: 1,
    pointAgainst: 14
};

export const matches = [match];