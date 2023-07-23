import React from 'react'

const Content = () => {
    const handleNameChange = () => {
        const names = ['A', 'B', 'C'];
        const int = Math.floor(Math.random() * 3);
        return names[int];
    }
    return (
        <main><h1>Hey {handleNameChange()}</h1></main>
    )
}

export default Content