const jwt = require('jsonwebtoken');

const secrets = require('./secrets');



function generateToken(user) {

    const payload = {
      author_id: user.id, // standard claim = sub
      author: user.author
    };

  
    const options = {
      expiresIn: '1d',
    };
  
    return jwt.sign(payload, secrets.jwtSecret, options);
  }

  module.exports = generateToken;