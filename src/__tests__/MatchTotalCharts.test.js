import React from 'react';
import renderer from 'react-test-renderer';
import MatchList from '../components/MatchList';
import { matches } from '../__mocks__/mocks';
import { BrowserRouter } from 'react-router-dom';
import MatchTotals from '../components/MatchTotalsChart';

const dataMock = [0.5, 0.7, 1];

it('renders correctly', () => {
    const tree = renderer
    .create(<MatchTotals data={dataMock}/>)
    .toJSON();

    expect(tree).toMatchSnapshot();
});