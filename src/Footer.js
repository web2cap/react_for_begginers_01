import React from 'react'

const Footer = ({ length }) => {
    const today = new Date();
    return (
        <footer>
            <p> List length: {length} Copyright &copy; {today.getFullYear()}</p>
        </footer>
    )
}

export default Footer