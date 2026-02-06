import { Link, useLocation } from "react-router-dom";

function NavBar() {
    const location = useLocation();
    const currentPath = location.pathname;
    const getNavbarBgClass = (path) => {
        if (path === '/') {
            return 'navbar-home'; 
        }
    };
    const navbarBgClass  = getNavbarBgClass(currentPath);
    const navbarClasses = `navbar  bodoni-moda-serif fixed-top pb-0 ${navbarBgClass}`;
    return(
       <nav className= {navbarClasses}>
    

        {/* --- 1. HAMBURGER BUTTON (Visible on screens smaller than lg) --- */}
        <button 
            className="navbar-toggler d-lg-none ms-3" // Show Toggler only when < lg
            style={{zIndex: 1000}} // Ensure it's above other content
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasNavbar" 
            aria-controls="offcanvasNavbar"
        >
            <span className="navbar-toggler-icon"></span>
        </button>

        {/* --- 2. LOGO (Always Visible, Centered on Mobile) --- */}
        <div className="navbar-brand  mx-auto d-lg-none bodoni-moda-serif"> 
            <h1>TIAN</h1>
        </div>
        <div style={{ width: '43px' }} className="me-3 d-lg-none"></div>

        {/* --- 3. DESKTOP LINKS (Hidden on screens smaller than lg) --- */}
        <div className="navbar-links mx-auto d-none d-lg-flex justify-content-center align-items-center gap-2">
            
            {/* Split the links around the logo for the desktop view */}
            {/* LEFT LINKS */}
            <Link to="/" className={currentPath==='/' ? 'active':''}>Home</Link>
            <div className="nav-item dropdown d-flex flex-column">
                <Link 
                    to="/portrait" 
                    className={` nav-link ${currentPath.startsWith('/portrait') ? 'active':''}`}
                    id="portraitDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Portrait
                </Link>
                <ul className="dropdown-menu border-0 rounded-0 shadow mt-2 " aria-labelledby="portraitDropdown" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}} >
                    
                    <li><div className="d-block mb-2"><Link to="/portrait/individual" className={`${currentPath==='/portrait/individual' ? ' active':''}`} >個人寫真</Link></div></li>
                    <li><div className="d-block mb-2"><Link to="/portrait/couple" className={`${currentPath==='/portrait/couple' ? ' active':''} `}>雙人寫真</Link></div></li>
                    <li><div className="d-block mb-2"><Link to="/portrait/registration" className={` ${currentPath==='/portrait/registration' ? ' active':''} `}>登記寫真</Link></div></li>
                    <li><div className="d-block mb-2"><Link to="/portrait/child" className={` ${currentPath==='/portrait/child' ? ' active':''} `}>親子寫真</Link></div></li>
                    <li><div className="d-block "><Link to="/portrait/family" className={` ${currentPath==='/portrait/family' ? ' active':''} `}>全家福</Link></div></li>
                </ul>
            </div>
            <div className="nav-item dropdown d-flex flex-column">
                <Link 
                    to="/wedding" 
                    className={` nav-link ${currentPath.startsWith('/wedding') ? 'active':''}`}
                    id="weddingDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Wedding
                </Link>
                <ul className="dropdown-menu border-0 rounded-0 shadow mt-2 " aria-labelledby="weddingDropdown" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}} >
                    
                    <li><div className="d-block mb-2"><Link to="/wedding/day" className={`${currentPath==='/wedding/day' ? ' active':''}`} >婚禮紀錄</Link></div></li>
                    <li><div className="d-block "><Link to="/wedding/pre" className={`${currentPath==='/wedding/pre' ? ' active':''} `}>婚紗寫真</Link></div></li>
                </ul>
            </div>
            <div className="nav-item dropdown d-flex flex-column">
                <Link 
                    to="/travel" 
                    className={` nav-link ${currentPath.startsWith('/travel') ? 'active':''}`}
                    id="travelDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Travel
                </Link>
                <ul className="dropdown-menu border-0 rounded-0 shadow mt-2 " aria-labelledby="travelDropdown" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}} >
                    
                    <li><div className="d-block "><Link to="/travel/city" className={`${currentPath==='/travel/city' ? ' active':''}`} >城市旅拍</Link></div></li>

                </ul>
            </div>
            

            <div className="navbar-brand mb-1 mx-3 bodoni-moda-serif "> 
                <h1>TIAN</h1>
            </div>

            
            
            
            <div className="nav-item dropdown d-flex flex-column">
                <Link 
                    to="/activity" 
                    className={` nav-link ${currentPath.startsWith('/activity') ? 'active':''}`}
                    id="activityDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Activity
                </Link>
                <ul className="dropdown-menu border-0 rounded-0 shadow mt-2 " aria-labelledby="activityDropdown" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}} >
                    
                    <li><div className="d-block mb-2"><Link to="/activity/life" className={`${currentPath==='/activity/life' ? ' active':''}`} >生活紀錄</Link></div></li>
                    <li><div className="d-block "><Link to="/activity/company" className={`${currentPath==='/activity/company' ? ' active':''}`} >公司活動</Link></div></li>

                </ul>
            </div>
            <Link to="/concert" className={currentPath.startsWith('/concert') ? 'active':''}>Concert</Link>
            <Link to="/myworks" className={currentPath==='/myworks' ? 'active':''}>My Works</Link>
            <Link to="/about" className={currentPath==='/about' ? 'active':''}>About</Link>
        </div>
        
    

    {/* --- 4. OFFCANVAS CONTAINER (The Mobile Menu) --- */}
    <div 
        className="offcanvas offcanvas-start bg-light" 
        style={{ width: '70vw'}}
        tabIndex="-1" 
        id="offcanvasNavbar" 
        aria-labelledby="offcanvasNavbarLabel"
    >
        <div className="offcanvas-header ">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            <div className="navbar-nav navbar-links justify-content-start flex-grow-1 pe-3">
            {/* 1. HOME */}
            <div className="nav-item mb-4"><Link to="/" className={`${currentPath==='/' ? 'active':''}`}>Home</Link></div>

            {/* 2. PORTRAIT + SUB-MENU */}
            <div className="nav-item dropdown mb-4">
                <a 
                    className={`${currentPath.startsWith('/portrait') ? 'active':''}`}
                    href="#" 
                    role="button" 
                    data-bs-toggle="dropdown" 
                    data-bs-auto-close="false"
                    aria-expanded="false"
                >
                    Portrait
                </a>
                <ul className="dropdown-menu border-0 bg-transparent ps-3">
                    <div className="d-block mb-3"><li><Link to="/portrait/individual" className={`${currentPath==='/portrait/individual' ? 'active':''}`}>個人寫真</Link></li></div>
                    <div className="d-block mb-3"><li><Link to="/portrait/couple" className={` ${currentPath==='/portrait/couple' ? 'active':''}`}>雙人寫真</Link></li></div>
                    <div className="d-block mb-3"><li><Link to="/portrait/registration" className={` ${currentPath==='/portrait/registration' ? 'active':''}`}>登記寫真</Link></li></div>
                    <div className="d-block mb-3"><li><Link to="/portrait/child" className={` ${currentPath==='/portrait/child' ? 'active':''}`}>親子寫真</Link></li></div>
                    <div className="d-block"><li><Link to="/portrait/family" className={` ${currentPath==='/portrait/family' ? 'active':''}`}>全家福</Link></li></div>
                </ul>
            </div>

            {/* 3. WEDDING + SUB-MENU */}
            <div className="nav-item dropdown mb-4">
                <a 
                    className={` ${currentPath.startsWith('/wedding') ? 'active':''}`}
                    href="#" 
                    role="button" 
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="false"
                    aria-expanded="false"
                >
                    Wedding
                </a>
                <ul className="dropdown-menu border-0 bg-transparent ps-3">
                    <div className="d-block  mb-3"><li><Link to="/wedding/day" className={` ${currentPath==='/wedding/day' ? 'active':''}`}>婚禮紀錄</Link></li></div>
                    <div className="d-block "><li><Link to="/wedding/pre" className={` ${currentPath==='/wedding/pre' ? 'active':''}`}>婚紗寫真</Link></li></div>
                </ul>
            </div>
            {/* 5. TRAVEL + SUB-MENU */}

            <div className="nav-item dropdown mb-4">
                <a 
                    className={` ${currentPath.startsWith('/travel') ? 'active':''}`}
                    href="#" 
                    role="button" 
                    data-bs-toggle="dropdown" 
                    data-bs-auto-close="false"
                    aria-expanded="false"
                >
                    Travel
                </a>
                <ul className="dropdown-menu border-0 bg-transparent ps-3">
                    <li><Link to="/travel/city" className={`${currentPath==='/travel/city' ? 'active':''}`}>城市旅拍</Link></li>
                </ul>
            </div>
           
            
            

            {/* 6. ACTIVITY + SUB-MENU */}
            <div className="nav-item dropdown mb-4">
                <a 
                    className={`  ${currentPath.startsWith('/activity') ? 'active':''}`}
                    href="#" 
                    role="button" 
                    data-bs-toggle="dropdown" 
                    data-bs-auto-close="false"
                    aria-expanded="false"
                >
                    Activity
                </a>
                <ul className="dropdown-menu border-0 bg-transparent ps-3">
                    <div className="d-block mb-3"><li><Link to="/activity/life" className={` ${currentPath==='/activity/life' ? 'active':''}`}>生活紀錄</Link></li></div>
                    <div className="d-block "><li><Link to="/activity/company" className={`${currentPath==='/activity/company' ? 'active':''}`}>公司活動</Link></li></div>
                </ul>
            </div>
            {/* 4. CONCERT */}
            <div className="d-block mb-4"><Link to="/concert" className={`${currentPath.startsWith('/concert') ? 'active':''}`}>Concert</Link></div>

            {/* 7. OTHER LINKS */}
            <div className="d-block mb-4"><Link to="/myworks" className={` ${currentPath==='/myworks' ? 'active':''}`}>My Works</Link></div>
            <div className="d-block mb-4"><Link to="/about" className={` ${currentPath==='/about' ? 'active':''}`}>About</Link></div>
        </div>
                </div>
    </div>
</nav>
    );
}

export default NavBar;