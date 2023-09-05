import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import MatchList from '../components/MatchList';
import { matches } from '../__mocks__/mocks';
import { BrowserRouter } from 'react-router-dom';

// jest.mock('../api');

const handleDeleteMock = jest.fn();

const teamMock = {
    teamName: 'Bredagh',
    teamLevel: 'Senior',
}

jest.mock('../api', () => {
    return {
        getTotalGoals: jest.fn(() => 2),
        getTotalPoints: jest.fn(() => 10),
        getTeamById: jest.fn(() => {
            return teamMock;
        })
    };
})


it('renders correctly', () => {
    const tree = renderer
    .create(<BrowserRouter><MatchList matches={matches} onDelete={handleDeleteMock}/></BrowserRouter>)
    .toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders a MatchShow card for each match', async () => {

    const { getAllByLabelText } = await render(
        <BrowserRouter>
            <MatchList matches={matches} onDelete={handleDeleteMock}/>
        </BrowserRouter>
    );

    // finds 2 elements with the label card-title
    expect((await screen.getAllByLabelText('card-title')).length).toBe(2);

})