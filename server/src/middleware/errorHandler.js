const errorHandling = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        status: 500,
        message: "something went wrong",
        erorr: err.message,
    });
};

export default errorHandling;