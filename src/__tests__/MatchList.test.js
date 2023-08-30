import React from 'react';
import renderer from 'react-test-renderer';
import MatchList from '../components/MatchList';
import { matches } from '../__mocks__/mocks';
import { BrowserRouter } from 'react-router-dom';


it('renders correctly', () => {
    const tree = renderer
    .create(<BrowserRouter><MatchList matches={matches} onDelete={() => {return;}}/></BrowserRouter>)
    .toJSON();

    expect(tree).toMatchSnapshot();
});