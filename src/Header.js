const Header = (props) => {
    return (
        <header className="App-header">
            <h2>{props.title}</h2>
        </header>
    )
}

Header.defaultProps = {
    title: "Default Title"
}

export default Header;