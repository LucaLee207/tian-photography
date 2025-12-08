import {react} from 'react';

function EventCard2({ event }) {
    return (
         <>
        <div className="mx-5 my-5">

            <h3 className=" d-lg-none index-number mx-auto my-3 text-center">{event.position}</h3>
            <div className="card mx-auto w-100 rounded-0  border-end-0 border-top-0 border-bottom-0 border-3  " >
                <div className="row g-0 d-flex justify-content-center " >
                    <div className="col-12 col-lg-7 my-auto px-3 order-lg-1" >
                        <div className="row g-0 d-flex justify-content-center align-items-center" >
                            <div className="col-12 col-lg-11 " >
                                <img src="https://imgv3.fotor.com/images/blog-richtext-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg" className="img-fluid  object-fit-cover" alt="Card Image"/>
                            </div>
                            <h3 style={{textAlign:"end"}} className="col-0 col-lg-1 index-number mx-auto my-auto d-none d-lg-block align-self-end">{event.position}</h3>
                        </div>
                    </div>
                     
                    <div className="col-12 col-lg-5 px-3 my-0 order-lg-0">
                        <div className="d-flex flex-column ps-lg-5">
                            <h3 className="card-title">{event.title} </h3>
                            <p className="card-text">{event.content}ue and I have been fortunate enough tue and I have been fortunate enough tue and I have been fortunate enough tue and I have been fortunate enough to photograph all types ceremonies and celebrations in the past 7 years. My goal is to create photos in a photojournalistic and unobtrusive way to help you remember the day as it really happened... </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
        </>
    )
}

export default EventCard2;