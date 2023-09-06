import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TeamShow from "../components/TeamShow";
import { BrowserRouter } from 'react-router-dom';

it('handleDelete deletes a team', () => {
    const handleDeleteMock = jest.fn();
    const teamMock = {
        _id: "1",
        teamName: "UnitTest",
        teamLevel: "Senior",
    };

    // we call the team show component and pass in some mocks:
        // mock team data
        // a mock delete function
    const { getByLabelText } = render(<BrowserRouter><TeamShow team={teamMock} onDelete={handleDeleteMock} /></BrowserRouter>);
    // we render this document and then within the document find an element with the lable "Delete"
    // this finds the delete button from within the team show component
    const button = getByLabelText("Delete");
    // we can then trigger a click event of this delete button and mock out the user functionality
    fireEvent.click(button);

    // in the team show component once the delete button is clicked it triggers the onDelete function
    // we can check that this function has been triggered through the following assertion
    expect(handleDeleteMock).toHaveBeenLastCalledWith("1")
})