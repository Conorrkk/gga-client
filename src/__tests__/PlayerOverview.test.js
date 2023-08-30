import React from 'react';
import renderer from 'react-test-renderer';
import MatchList from '../components/MatchList';
import { match, matches, player1 } from '../__mocks__/mocks';
import { BrowserRouter } from 'react-router-dom';
import PlayerOverview from '../components/PlayerOverview';


it('renders correctly', () => {
    const tree = renderer
    .create(<BrowserRouter><PlayerOverview player={player1} match={match} /></BrowserRouter>)
    .toJSON();

    expect(tree).toMatchSnapshot();
});