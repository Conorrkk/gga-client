import React from 'react';
import renderer from 'react-test-renderer';
import AccuracyChart from '../components/AccuracyChart';

const dataMock = [0.5, 0.7, 1];

it('renders correctly', () => {
    const tree = renderer
    .create(<AccuracyChart data={dataMock}/>)
    .toJSON();

    expect(tree).toMatchSnapshot();
});