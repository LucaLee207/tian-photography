import { Link } from "react-router-dom";

function NavBar() {
    return(
        <nav className="navbar">
            <div className = "navbar-brand">
                <Link to="/">Tian's Websites</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/portrait">Portrait</Link>
                <div className="dropdown">
                    <Link to="/event">Event</Link>
                    <div className="dropdown-content">
                        <Link to="/event/wedding">Wedding</Link>
                        <Link to="/event/concert">Concert</Link>
                        <Link to="/event/travel">Travel</Link>
                        <Link to="/event/activity">Activity</Link>
                    </div>
                </div>
                
                <Link to="/myworks">My Works</Link>
                <Link to="/about">About</Link>
            </div>
        </nav>
    );
}

export default NavBar;