import "./header.css"

const Header = () => {
    return (
      <header>
        <h1>
          <a href="#">Trivia</a>
        </h1>
        <nav>
          <ul>
            <li>
              <a href="#" className="nav-item">Home</a>
            </li>
            <li>
              <a href="#" className="nav-item">About</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Header;
  