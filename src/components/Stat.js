import React from "react";
import { useDrag } from "react-dnd";
import Button from "react-bootstrap/Button"

function Stat({ id, stat }) {
    // is dragging is a boolean which returns true if dragging and false if not 
    const [{isDragging}, drag] = useDrag(() => ({
        // every element in react dnd needs a type - this is an identifier that you can make up
        type: "button",
        item: {id: id},
        // collect function lets us define diff states & props that are accessible when we call useDrag hook
        // optional and can be deleted once we have everything set up and working - only needed if you want to access the is dragging boolean
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))
    return <Button ref={drag} style={{border: isDragging ? "3px solid red" : "0px"}}>{stat}</Button>
}

export default Stat;