const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;
    if (!token) return res.status(401).json({ message: 'No token. Authorization denied.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // decoded contains { user: { id } }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
