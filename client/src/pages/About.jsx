import React from "react"


function About(){
    return(

        <div className="d-flex-column justify-content-center align-items-center">
            
            <div className="w-75 my-5 pt-5 pe-3 mx-auto text-center "> 
                <img 
                    src={"./about.jpg"} 
                    className="img-fluid object-fit-cover p-1 about-img" /* ⬅️ Image takes 100% of its parent (w-50) */
                    alt="Aboutpage" 
                />
            </div>

            <div className="mx-auto text-center px-lg-5  ">
                <h2 className="mb-4">關於我 <a href="https://www.instagram.com/tifflee0905/" className="mt-0"><img src={"./instagram.png"} className="ms-2 " style={{width: "35px", height: "35px"}} alt="Instagram"/></a></h2>
                <div className="px-5 mx-lg-5">
                <p className="mb-3 px-lg-3">
                    你好！我是小田。我是一名熱愛攝影的攝影師，致力於捕捉生命中最珍貴時刻的美麗與精髓。憑藉著對細節的敏銳洞察力以及對影像敘事的熱愛，我努力讓每張照片不僅能展現主角的個性，更能喚起觸動人心的情感與永恆的回憶。
                </p>
                <p className="mb-3 px-lg-3">
                    我的攝影之路始於多年前。從那時起，我便在不同的風格中磨練技巧，包括人像、婚禮、音樂會、旅遊以及活動攝影。每一種類別都讓我能從不同面向探索人類經驗，我也衷心擁抱每一項任務帶來的挑戰與成就感。
                </p>
                <p className="mb-3 px-lg-3">
                    沒拿相機的時候，我喜歡探索新地方、結識新朋友，並從周遭的世界中尋找靈感。我相信每一張照片都在訴說一個故事，而我致力於透過我的鏡頭，幫助客戶留住他們最珍藏的回憶。
                </p>
                <p className="mb-3 px-lg-3">
                    感謝你造訪我的作品集。我期待能有機會與你合作，為你捕捉那些值得一生珍藏的瞬間。
                </p>
                </div>
            </div>

          
        </div>
    )
}

export default About