import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    jwt.verify(token, "potatoe");
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Auth failed, Token expired. Please log back in!",
    });
  }
};
