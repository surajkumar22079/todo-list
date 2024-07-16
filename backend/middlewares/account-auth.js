import jwt from "jsonwebtoken";

export const ensureAccess = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({
      message: "Authorization denied",
    });

  jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    req.user = user;
    next();
  });
};