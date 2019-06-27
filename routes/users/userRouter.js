const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const secrets = require('../../config/auth/secrets');

const userModel = require('./userModel');


/****************************************************************************/
/*                    Get a user profile and related posts by Id            */
/****************************************************************************/
router.get('/users/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const user = await userModel.findBy({id}); 
            if(user) {
                const posts = await userModel.findPostsByAuthorId(id) 
                res.status(200).json({user, posts});
            }
            else {
                res.status(404).json({message:'user not found'});
            }  
    }
    catch {
        res.status(500).json({errorMessage: "There was a problem getting the data"})
    }
})


module.exports = router;