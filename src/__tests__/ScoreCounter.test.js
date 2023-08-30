import React from 'react';
import { BrowserRouter } from "react-router-dom";
import renderer from 'react-test-renderer';
import NavBar from "../components/NavBar"
import ScoreCounter from '../components/ScoreCounter';


it('renders correctly', () => {
    const tree = renderer
    .create(<ScoreCounter/>)
    .toJSON();

    expect(tree).toMatchSnapshot();
});