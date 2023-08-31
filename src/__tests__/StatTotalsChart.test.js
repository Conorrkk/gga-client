import React from "react";
import renderer from 'react-test-renderer';
import StatTotalsChart from "../components/StatTotalsChart";

const dataMock = [4, 1, 0, 9];

it('renders correctly', () => {
    const tree = renderer
    .create(<StatTotalsChart data={dataMock}/>)
    .toJSON();

    expect(tree).toMatchSnapshot();
});