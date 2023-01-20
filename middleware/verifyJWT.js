const jwt = require("jsonwebtoken");
const {
  handleRefreshToken,
} = require("../controller/auth-controller/refreshContoller");

const verifyJWT = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header)
    return res.status(401).json("Authorization Header not available");
  const token = header.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json("Forbidden");

    next();
  });

  // jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
  //   if (err) {
  //     const accessToken = handleRefreshToken(req, res);
  //     console.log("from verufyJWT", accessToken);
  //     if (accessToken) {
  //       jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
  //         if (err) return res.status(403).json("forbidden");

  //         res.json({ accessToken });
  //         next();
  //       });
  //     }
  //     res.status(403).json("Forbidden");
  //   } else {
  //     next();
  //   }
  // });
};

module.exports = verifyJWT;
