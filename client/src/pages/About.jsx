import React from "react"


function About(){
    return(

        <div className="d-flex-column justify-content-center align-items-center">
            
            <div className="w-75 my-5 pt-5 pe-3 mx-auto text-center image-container"> 
                <img 
                    src={"./about.jpg"} 
                    className="img-fluid object-fit-cover w-75 p-1 about-img" /* ⬅️ Image takes 100% of its parent (w-50) */
                    alt="Aboutpage" 
                />
                
            </div>

            
            <div className="mx-auto text-center px-5  ">
                <h2 className="mb-4">About Me</h2>
                <div className="px-5 mx-5">
                <p className="mb-3 px-3">
                    Hello! I'm Tian, a passionate photographer dedicated to capturing the beauty and essence of life's most precious moments. With a keen eye for detail and a love for storytelling through images, I strive to create photographs that not only reflect the subject's personality but also evoke emotions and memories that last a lifetime.
                </p>
                <p className="mb-3 px-3">
                    My journey into photography began several years ago, and since then, I've honed my skills in various styles, including portrait, wedding, concert, travel, and event photography. Each genre offers a unique opportunity to explore different facets of human experience, and I embrace the challenges and rewards that come with each assignment.
                </p>
                <p className="mb-3 px-3">
                    When I'm not behind the camera, I enjoy exploring new places, meeting new people, and finding inspiration in the world around me. I believe that every photograph tells a story, and I'm committed to helping my clients preserve their most cherished memories through my lens.
                </p>
                <p className="mb-3 px-3">
                    Thank you for visiting my portfolio. I look forward to the opportunity to work with you and capture moments that you'll treasure forever.
                </p>
                </div>
            </div>

          
        </div>
    )
}

export default About