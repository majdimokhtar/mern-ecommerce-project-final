//404 not found error middleware after all routes

const notFound = (req,res,next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}


//arrow middleware sometimes we have error even at 200 make condition

const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ===200 ? 500 :res.statusCode
    res.status(statusCode)
    res.json({
        message : err.message,
        stack: process.env.NODE_ENV === "production" ?null :err.stack
    })
}


export {notFound , errorHandler}