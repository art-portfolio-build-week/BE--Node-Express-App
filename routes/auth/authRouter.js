const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');


const generateToken = require('../../config/auth/generateToken');

const authModel = require('./authModel');


module.exports = router;

/****************************************************************************/
/*                              Register a new  user                        */
/****************************************************************************/
router.post('/register', userCredentialsReceived, duplicatedCredentials, async (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    try {
        const addedUser = await authModel.add(user);
        token = generateToken(addedUser);
        res.status(201).json({message: `welcome ${user.author}`, token})
    }
    catch {
        res.status(500).json({"errorMessage": "That was a problem registering"})
    }
})

/****************************************************************************/
/*                              user Login                                  */
/****************************************************************************/

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await authModel.findBy({email})
        if(user && bcrypt.compareSync(password, user.password)) {
            token = generateToken(user);
            res.status(200).json({message: `welcome back ${user.author}`, token})
        }
        else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    }
    catch {
        res.status(500).json({"errorMessage": "That was a problem loggin in"})
    }
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////
/*                                           MIDDLEWARE                                                  */
///////////////////////////////////////////////////////////////////////////////////////////////////////////



/****************************************************************************/
/*            Check if author, email and password exist in req.body          */
/****************************************************************************/
function userCredentialsReceived(req, res, next) {
    const body = req.body;
    if(body.author && body.email && body.password) {
        next()
    }
    else {
        res.status(422).json({"errorMessage": "author, email and password are required"});
    }
}

/****************************************************************************/
/*                      Check for duplicate credentials                     */
/****************************************************************************/
async function duplicatedCredentials(req, res, next) {
    const {author, email}= req.body;

    try {
        let user1 = await authModel.findBy({author});
        let user2 = await authModel.findBy({email});

        if (user1 || user2) {
            res.status(405).json({errorMessage: "duplicated credential(s)"})
        }
        else {
            next()
        }
    }
    catch {
        res.status(500).json({"errorMessage": "That was a problem checking your credentials"})
    }
}

module.exports = router;