import React from 'react';
import renderer from 'react-test-renderer';
import MatchList from '../components/MatchList';
import { matches } from '../__mocks__/mocks';
import { BrowserRouter } from 'react-router-dom';
import CreateMatchPage from '../pages/CreateMatchPage';
import CurrentMatchContext, { MatchProvider } from '../context/CurrentMatchProvider';
import { render } from 'react-dom';


it('renders correctly', () => {

    const tree = renderer.create(
        <BrowserRouter>
            <MatchProvider>
                <CreateMatchPage />
            </MatchProvider>
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});