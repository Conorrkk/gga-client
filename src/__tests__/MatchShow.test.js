import React from 'react';
import renderer, { act } from 'react-test-renderer';
import MatchList from '../components/MatchList';
import { match } from '../__mocks__/mocks';
import { BrowserRouter } from 'react-router-dom';
import MatchShow from '../components/MatchShow';
import axios from 'axios';

// import moduleName, {foo} from '../moduleName';

// jest.mock('../moduleName', () => {
//     return {
//       __esModule: true,
//       default: jest.fn(() => 42),
//       foo: jest.fn(() => 43),
//     };
//   });
const teamMock = {
    teamName: 'Bredagh',
    teamLevel: 'Senior',
}
  
jest.mock('../api', () => {
    return {
        _esModule: true,
        getTotalGoals: jest.fn(() => 2),
        getTotalPoints: jest.fn(() => 10),
        getTeamById: jest.fn(() => {
            return teamMock;
        })
    };
});

it('renders correctly', async () => {
    const res = {
        totalGoals: 1,
        totalPoints: 10
    };
    // jest.spyOn(global, "getTotalGoals").mockReturnThis(res);
    let tree;
    await act(async () => {
        tree = renderer
            .create(<BrowserRouter><MatchShow match={match} onDelete={() => {return;}}/></BrowserRouter>)
            .toJSON();
    })

    expect(tree).toMatchSnapshot();
});