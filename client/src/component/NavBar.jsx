import { Link, useLocation } from "react-router-dom";

function NavBar() {
    const location = useLocation();
    const currentPath = location.pathname;

    return(
        <nav className="navbar bodoni-moda-serif">
            <div className = "navbar-brand">
                <h1>Tian</h1>
            </div>
            <div className="navbar-container">
                <div className="navbar-links">
                    <Link to="/" className={currentPath==='/' ? 'active':''}>Home</Link>
                    <Link to="/portrait" className={currentPath==='/portrait' ? 'active':''}>Portrait</Link>
                    <Link to="/event/wedding" className={currentPath==='/event/wedding' ? 'active':''}>Wedding</Link>
                    <Link to="/event/concert" className={currentPath==='/event/concert' ? 'active':''}>Concert</Link>
                    <Link to="/event/travel" className={currentPath==='/event/travel' ? 'active':''}>Travel</Link>
                    <Link to="/event/activity" className={currentPath==='/event/activity' ? 'active':''}>Activity</Link>
                    <Link to="/myworks" className={currentPath==='/myworks' ? 'active':''}>MyWorks</Link>
                    <Link to="/about" className={currentPath==='/about' ? 'active':''}>About</Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;