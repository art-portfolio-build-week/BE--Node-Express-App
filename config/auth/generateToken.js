const jwt = require('jsonwebtoken');

const secrets = require('./secrets');



function generateToken(user) {

    const payload = {
      subject: user.id, // standard claim = sub
    };

  
    const options = {
      expiresIn: '1d',
    };
  
    return jwt.sign(payload, secrets.jwtSecret, options);
  }

  module.exports = generateToken;