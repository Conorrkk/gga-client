import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { match } from '../__mocks__/mocks';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import MatchShow from '../components/MatchShow';
import { render, fireEvent, waitFor } from '@testing-library/react';

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
});

const handleDeleteMock = jest.fn();
const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom')),
    useNavigate: () => mockUseNavigate,
}));

const setState = jest.fn();
jest.spyOn(React, 'useState').mockImplementation(initState => [initState, setState]);

it('renders correctly', async () => {
    let tree = renderer
            .create(<BrowserRouter><MatchShow match={match} onDelete={() => {return;}}/></BrowserRouter>)
            .toJSON();

    await waitFor(() => {
        expect(tree).toMatchSnapshot();
    });
});

it('calls onDelete with the matchId whenever the delete button is clicked', async () => {
    const { getByLabelText } = render(<BrowserRouter><MatchShow match={match} onDelete={handleDeleteMock} /></BrowserRouter>);

    const deleteButton = getByLabelText("Delete");

    await fireEvent.click(deleteButton);

    await waitFor(() => {
        expect(handleDeleteMock).toHaveBeenCalledWith("123");
    });
});

it('navigates to match overview once the view button is clicked', async () => {
    const { getByLabelText } = await render(<BrowserRouter><MatchShow match={match} onDelete={handleDeleteMock} /></BrowserRouter>);

    const viewButton = getByLabelText("ViewMatch");

    await fireEvent.click(viewButton);

    await waitFor(() => {
        expect(mockUseNavigate).toHaveBeenCalledWith('/matchOverview/123');
    });

});