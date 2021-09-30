import React from "react";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import Display from '../Display'

const testShow = {
    // add in appropriate test data structure here.
    name: "Stranger Things",
    summary: "",
    seasons: [
        {
            id: 1,
            name: "Season 1",
            episodes: [],
        },
        {
            id: 2,
            name: "Season 2",
            episodes: [],
        },
        {
            id:3,
            name: "Season 3",
            episodes: [],
        },
    ]
}

test('Display renders without errors', () => {
    render(<Display />)
})

test('Show component renders when button is pressed', async () => {
    // Arrange
    render(<Display />)

    //Act
    const fetchButton = screen.getByRole('button')
    fireEvent.click(fetchButton)

    // Assert
    expect(fetchButton).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByTestId('show-container')).toBeInTheDocument();
    })


})

test('When button is pressed, select options is equal to array length', async () => {
    
    // Arrange
    render(<Display />)

    // Act
    const fetchButton = screen.getByRole('button')
    fireEvent.click(fetchButton)

    // Assert
    expect(fetchButton).toBeInTheDocument();

    await waitFor(() => {
        const numberOfSeasons = screen.queryAllByTestId(/season-option/i)

        expect(numberOfSeasons).toHaveLength(4);
    })

})

test('displayFunc called when button is pressed', async () => {
    const fakeDisplayFunc = jest.fn(() => {
        return "dummy data"
    })

    // Arrange
    render(<Display displayFunc={() => fakeDisplayFunc()}/>)

    // Act
    const fetchButton = screen.getByRole('button')
    fireEvent.click(fetchButton)

    // Assert
    await waitFor(() => {
        expect(fakeDisplayFunc).toHaveBeenCalled();
    })
})













///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.