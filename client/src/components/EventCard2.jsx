
function EventCard2({ event }) {
    return (
         <>
        <div className="mx-0 my-5">

            <h3 className=" d-lg-none index-number mx-auto my-3 text-center">{event.position}</h3>
            <div className="card mx-auto w-100 rounded-0  border-end-0 border-top-0 border-bottom-0 border-3  " >
                <div className="row g-0 d-flex justify-content-center " >
                    <div className="col-12 col-lg-6 my-auto px-3 order-lg-1" >
                        <div className="row g-0 d-flex justify-content-center align-items-center" >
                            <div className="col-12 col-lg-11 " >
                                <img src={event.url} className="img-fluid  object-fit-cover" alt={event.filename}/>
                            </div>
                            <h3 style={{textAlign:"end"}} className="col-0 col-lg-1 index-number mx-auto my-auto d-none d-lg-block align-self-end">{event.position}</h3>
                        </div>
                    </div>
                     
                    <div className="col-12 col-lg-6 px-3 my-0 order-lg-0">
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