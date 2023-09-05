const teamMock = {
    teamName: 'Bredagh',
    teamLevel: 'Senior',
}

export const apiRequests = () => {
    return {
        getTotalGoals: jest.fn(() => 2),
        getTotalPoints: jest.fn(() => 10),
        getTeamById: jest.fn(() => {
            return teamMock;
        })
    };
}