import React from "react"
import { Link } from "react-router-dom";

function NoMatch(){
    return(
        
        <div className="container vh-100 d-flex align-items-center justify-content-center text-center">
            <div>
                
                <h1 className="bodoni-moda-serif display-1 fw-bold mb-0">404</h1>
                
                <div className="my-4">
                    <h2 className="bodoni-moda-serif h2">照片失焦了 . . .</h2>
                    <p className="text-muted mt-3">
                        就像捕捉瞬間一樣，有些頁面稍縱即逝。
                        <br />您要尋找的內容可能已經移動或不復存在。
                    </p>
                </div>

                <Link to="/" className="btn btn-outline-dark rounded-pill px-4 py-2 mt-3">
                    回到首頁 (Return to Gallery)
                </Link>
            </div>
        </div>
    );
};
    


export default NoMatch