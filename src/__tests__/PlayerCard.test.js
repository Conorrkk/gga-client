import React from 'react';
import { BrowserRouter } from "react-router-dom";
import renderer from 'react-test-renderer';
import PlayerCard from '../components/PlayerCard';

const playerMock = {
    _id: '123',
    playerName: 'Harry Potter',
    playerPosition: 'Midfield'
};

it('renders correctly', () => {
    const tree = renderer
    .create(<BrowserRouter><PlayerCard player={playerMock}/></BrowserRouter>)
    .toJSON();

    expect(tree).toMatchSnapshot();
});