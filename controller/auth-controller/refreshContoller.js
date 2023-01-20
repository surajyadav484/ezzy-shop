const jwt = require("jsonwebtoken");

exports.handleRefreshToken = (req, res) => {
  const { jwt: refreshToken } = req.cookies;
  if (!refreshToken) return res.sendStatus(403);

  return jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_KEY,
    (err, decoded) => {
      if (err) return res.sendStatus(403);
      const accessToken = jwt.sign(
        { user: decoded.user },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30s",
        }
      );
      res.json({ accessToken });
    }
  );
};
