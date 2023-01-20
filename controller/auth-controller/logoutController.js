const User = require("../../model/user");
exports.handleLogout = async (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) return res.status(204).json("no content");
  const foundUser = await User.findOne({ where: { refreshToken: jwt } });

  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      samesite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(204).json("no content");
  }

  foundUser.refreshToken = "";
  const updatedUser = await foundUser.save();

  res.clearCookie("jwt", {
    httpOnly: true,
    samesite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res.status(204).json("no content");
};
