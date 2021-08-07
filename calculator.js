const express = require('express');
const {mean, median, mode} = require('./math');
const {ExpressError} = require('./errors')

const app = express();


app.get('/mean', (req, res) => {
    const {nums} = req.query;

    if (!nums) {
        throw new ExpressError("'nums' cannot be empty", 400);
    }

    const avg = mean(nums);

    if (avg instanceof Error) {
        throw new ExpressError(avg.message, 400)
    }

    return res.json({
        response: {
            operation: "mean",
            value: avg
        }
    });
})

app.get('/median', (req, res) => {
    const {nums} = req.query;

    if (!nums) {
        throw new ExpressError("'nums' cannot be empty", 400);
    }

    const med = median(nums);
    
    if (med instanceof Error) {
        throw new ExpressError(med.message, 400)
    }
    
    return res.json({
        response: {
            operation: "median",
            value: med
        }
    });
})

app.get('/mode', (req, res) => {
    const {nums} = req.query;

    if (!nums) {
        throw new ExpressError("'nums' cannot be empty", 400);
    }

    const mod = mode(nums);

    if (mod instanceof Error) {
        throw new ExpressError(mod.message, 400)
    }

    return res.json({
        response: {
            operation: "mode",
            value: mod
        }
    });
})


app.use(function (req, res, next) {
    const notFoundErr = new ExpressError("Not Found", 404);
    return next(notFoundErr);
})


app.use(function (err, req, res, next) {
    let status = err.status || 500;
    let message = err.msg || "Unknown Error";

    return res.status(status).json({error: {message, status}})
})


app.listen(3000, () => {
    console.log("Server running on port 3000")
})