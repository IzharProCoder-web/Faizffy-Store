// authUser.js - FIXED
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  // Check both possible token names
  const token = req.cookies.user_token || req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
  
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (tokenDecode.id) {
      req.userId = tokenDecode.id; 
      next();
    } else {
      return res.status(403).json({ success: false, message: "Invalid token payload" });
    }
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;