const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Remove "Bearer " prefix if present
    const cleanToken = token.replace('Bearer ', '');

    // Verify token
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await User.findById(decoded.id).select('-password');

    next();  // Move to next middleware or route handler
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
