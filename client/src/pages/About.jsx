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
            <div className="mx-auto my-5 px-4" style={{ maxWidth: '480px' }}>
            
            <div className="d-flex align-items-center gap-2 mb-4">
                <h2 className="fs-3 fw-bold text-dark m-0">About Me</h2>
                <a href="https://www.instagram.com/tifflee0905/" className="mt-0"><img src={"./instagram.png"} className="ms-2 " style={{width: "35px", height: "35px"}} alt="Instagram"/></a>
            </div>
            <div className="text-start text-secondary" style={{ lineHeight: '2' }}>
                <p className="mb-4">
                嗨～我是小田！
                </p>

                <p className="mb-4">
                始於台中，生命擴展於南部，浸潤於金門，偶爾連結蘭嶼的土地，最終紮根高雄。
                </p>

                <p className="mb-4">
                喜歡紀錄眼睛裡流轉的光，看著彼此的眼神，因為愛而露出溫暖的笑，和要走一段路所牽起的手。
                </p>

                <p className="mb-4" style={{ whiteSpace: 'pre-line' }}>
                {`是個會燦爛大笑的 E 人。
                熱愛旅行，於是前往世界探險體驗。
                回到家鄉後，想把高雄的美分享給更多人。`}
                </p>

                <p className="mb-0">
                喜歡歷史故事、有些念舊，所以想把很多東西用相機紀錄下來，以後慢慢拿出來看。
                </p>
            </div>
            </div>
          
        </div>
    )
}

export default About