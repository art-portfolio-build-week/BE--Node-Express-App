const express = require('express');
const server = express();
server.use(express.json());

const cors = require('cors');
server.use(cors());

server.use(logger);

const authRouter = require('../routes/auth/authRouter');
const postRouter = require('../routes/posts/postsRouter');
const userRouter = require('../routes/users/userRouter');



server.get('/', (req, res) => {
    res.status(200).send("Artista API")
})

server.use('/api', authRouter);
server.use('/api', postRouter);
server.use('/api', userRouter);



/**************************************/
/*      Custom Middleware             */
/**************************************/

function logger(req, res, next) {
    console.log(`Method ${req.method} requested at URL: ${req.url} on ${new Date().toISOString()}`);
    next();
}

module.exports = server