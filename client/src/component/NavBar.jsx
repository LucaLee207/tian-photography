import { Link, useLocation } from "react-router-dom";

function NavBar() {
    const location = useLocation();
    const currentPath = location.pathname;

    return(
       <nav className="navbar bodoni-moda-serif fixed-top">
    

        {/* --- 1. HAMBURGER BUTTON (Visible on screens smaller than lg) --- */}
        <button 
            className="navbar-toggler d-lg-none" // Show Toggler only when < lg
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasNavbar" 
            aria-controls="offcanvasNavbar"
        >
            <span className="navbar-toggler-icon"></span>
        </button>

        {/* --- 2. LOGO (Always Visible, Centered on Mobile) --- */}
        
        <div className="navbar-brand mb-3 mx-auto d-lg-none"> 
            <img src={'/logo.png'} alt="Logo" height="30" />
        </div>

        {/* --- 3. DESKTOP LINKS (Hidden on screens smaller than lg) --- */}
        <div className="navbar-links mx-auto d-none d-lg-flex justify-content-center align-items-center gap-2">
            
            {/* Split the links around the logo for the desktop view */}
            {/* LEFT LINKS */}
            <Link to="/" className={currentPath==='/' ? 'active':''}>Home</Link>
            <Link to="/portrait" className={currentPath==='/portrait' ? 'active':''}>Portrait</Link>
            <Link to="/event/wedding" className={currentPath==='/event/wedding' ? 'active':''}>Wedding</Link>
            <Link to="/event/concert" className={currentPath==='/event/concert' ? 'active':''}>Concert</Link>
            
            <div className="navbar-brand mb-3 mx-3 "> 
                <img src={'/logo.png'} alt="Logo" height="30" />
            </div>
            {/* The Logo is already placed in the center (navbar-brand) */}
            
            {/* RIGHT LINKS */}
            <Link to="/event/travel" className={currentPath==='/event/travel' ? 'active':''}>Travel</Link>
            <Link to="/event/activity" className={currentPath==='/event/activity' ? 'active':''}>Activity</Link>
            <Link to="/myworks" className={currentPath==='/myworks' ? 'active':''}>MyWorks</Link>
            <Link to="/about" className={currentPath==='/about' ? 'active':''}>About</Link>
        </div>
        
    

    {/* --- 4. OFFCANVAS CONTAINER (The Mobile Menu) --- */}
    <div 
        className="offcanvas offcanvas-start bg-light" 
        tabIndex="-1" 
        id="offcanvasNavbar" 
        aria-labelledby="offcanvasNavbarLabel"
    >
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            <div className="navbar-nav justify-content-start flex-grow-1 pe-3">
                {/* List all links here for the mobile view */}
                <Link to="/" className={`nav-link ${currentPath==='/' ? 'active':''}`}>Home</Link>
                <Link to="/portrait" className={`nav-link ${currentPath==='/portrait' ? 'active':''}`}>Portrait</Link>
                <Link to="/event/wedding" className={`nav-link ${currentPath==='/event/wedding' ? 'active':''}`}>Wedding</Link>
                <Link to="/event/concert" className={`nav-link ${currentPath==='/event/concert' ? 'active':''}`}>Concert</Link>
                <Link to="/event/travel" className={`nav-link ${currentPath==='/event/travel' ? 'active':''}`}>Travel</Link>
                <Link to="/event/activity" className={`nav-link ${currentPath==='/event/activity' ? 'active':''}`}>Activity</Link>
                <Link to="/myworks" className={`nav-link ${currentPath==='/myworks' ? 'active':''}`}>MyWorks</Link>
                <Link to="/about" className={`nav-link ${currentPath==='/about' ? 'active':''}`}>About</Link>
            </div>
        </div>
    </div>
</nav>
    );
}

export default NavBar;