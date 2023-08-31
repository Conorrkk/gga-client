import React from 'react';
import renderer from 'react-test-renderer';
import PerformanceChart from '../components/PerformanceChart';

const dataMock = [
    {
        name: "John",
        amount: 8,
        statName: "Points from play"
    },
    {
        name: "Conor",
        amount: 8,
        statName: "Points from play"
    },
    {
        name: "Paul",
        amount: 8,
        statName: "Points from play"
    }
]

it('renders correctly', () => {
    const tree = renderer
    .create(<PerformanceChart data={dataMock}/>)
    .toJSON();

    expect(tree).toMatchSnapshot();
})