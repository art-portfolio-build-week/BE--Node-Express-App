const express = require('express');
const server = express();
server.use(express.json());

const cors = require('cors');
server.use(cors());

server.use(logger);

const authRouter = require('../routes/auth/authRouter');
const postRouter = require('../routes/posts/postsRouter');



server.get('/', (req, res) => {
    res.status(200).send("Will Provide art pictures in the future")
})

server.use('/api', authRouter);
server.use('/api', postRouter);



/**************************************/
/*      Custom Middleware             */
/**************************************/

function logger(req, res, next) {
    console.log(`Method ${req.method} requested at URL: ${req.url} on ${new Date().toISOString()}`);
    next();
}

module.exports = server