
import { useState } from 'react'

const Content = () => {
    const [name, setName] = useState('cnmae')
    const [count, setCount] = useState(0)

    const handleNameChange = () => {
        const names = ['A', 'B', 'C']
        const int = Math.floor(Math.random() * 3)
        setName(names[int])
    }

    const handleClick = () => {
        setCount(count + 1)
        console.log(count)
    }
    const handleClick2 = (name) => {
        console.log(`${name} was clicked`)
    }
    const handleClick3 = (e) => {
        console.log(e.target.innerText)
    }
    return (
        <main>
            <h1 onDoubleClick={handleClick}>Hey {name}</h1>
            <button onClick={handleNameChange}>Change hello</button>
            <button onClick={() => handleClick2('handleClick2')}>Click me 2</button>
            <button onClick={(e) => handleClick3(e)}>Click me 3</button>

        </main>
    )
}

export default Content