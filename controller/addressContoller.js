const User = require("../model/user");

//add new address
exports.addAddress = async (req, res) => {
  try {
    const { userId, addressLine1, addressLine2, city, state, zipcode } =
      req.body;
    const user = await User.findByPk(userId);
    const addedAddress = await user.createAddress({
      addressLine1,
      addressLine2,
      city,
      state,
      zipcode,
    });

    return res.status(200).json({ addedAddress });
  } catch (error) {
    return res.json({ err: error.message });
  }
};
