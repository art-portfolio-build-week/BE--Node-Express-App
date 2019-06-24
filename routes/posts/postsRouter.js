const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const secrets = require('../../config/auth/secrets');

const postModel = require('./postModel');



/****************************************************************************/
/*                              Get all posts                               */
/****************************************************************************/
router.get('/posts', async (req, res) => {
    try {
        const posts = await postModel.findAll();
        res.status(200).json(posts);
    }
    catch {
        res.status(500).json({errorMessage: "There was a problem getting the data"})
    }
})

/****************************************************************************/
/*                              update Existing post                        */
/****************************************************************************/

router.put('/posts/:id', verifyCredentials, async (req, res) => {

    const {id} = req.params;
    const changes = req.body;

    if(changes.id || changes.username_id) {
        res.status(403).json({errorMessage: "Not allowed to change ids" })
    }

    if(changes.description || changes.imgURL || votes) {
        try {
            count = await postModel.update({id}, changes)
            if(count > 0) {
                res.status(200).json({message:`${count} records updated`});
            }
            else {
                res.status(400).json({message: 'post not found'});
            }
        }
        catch {
            res.status(500).json({message: "There was a problem updating the post"});
        }
    }
    else {
        res.status(400).json({message: 'no valid fields to change'});
        
    }
})


/****************************************************************************/
/*                              insert new post                             */
/****************************************************************************/

router.post('/posts', validatePostInfo, verifyCredentials, async (req, res) => {
    const post = {
        username_id: req.user.username_id,
        imgURL: req.body.imgURL,
        description: req.body.description,
        votes: 0 
    }

    console.log(post)
    try {
        const newPost = await postModel.add(post, 'id');
        res.status(201).json({newPost});
    }
    catch {
        res.status(500).json({"errorMessage": "That was a problem adding your post"})
    }
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////
/*                                           MIDDLEWARE                                                  */
///////////////////////////////////////////////////////////////////////////////////////////////////////////



/****************************************************************************/
/*            Check if description and image URL exist in req.body          */
/****************************************************************************/

function validatePostInfo(req, res, next) {
    const post = req.body;
    if(post.description && post.imgURL) {
        next();
    }
    else {
        res.status(422).json({"errorMessage": "description and imgURL are required"});
    }
}

/****************************************************************************/
/*         Check if user is logged in and save header info in req.user      */
/****************************************************************************/

function verifyCredentials(req, res, next) {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
            else {
                req.user = {username_id: decodedToken.username_id, username: decodedToken.username }
                next();
            }
        })
    }
    else {
        res.status(400).json({ message: 'No token provided' });
    }
}

module.exports = router;