const asyncHandler = require("express-async-handler");
const User = require("../modals/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
const register = asyncHandler(async (req, res) => {
  try {
    const { username, firstName, password, lastName } = req.body;
    // hashing Password Bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // creating new user
    const newUser = new User({
        username,
        firstName,
        lastName,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err)
  }
});

//login
const login = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      res.status(404).json("برجاء ادخال اسم المستخدم");
    }
    const user = await User.findOne({ username });
    if (!user) {
     res.status(404).json("لا يوجد مستخدم بهذا الاسم");
    }
    // comparing Password Bcrypt
    const isCorrect = await bcrypt.compareSync(password, user.password);
    if (!isCorrect) {
     res.status(500).json("كلمه المرور غير صحيحه");
    }
    // const { password, ...others } = user;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
const getAllUsers = asyncHandler(async (req, res) => {
   try {
     const oneUsers = await User.find();
     res.status(200).json(oneUsers);
   } catch (err) {
     res.status(505).json(err);
   }
})
const deleteUser = asyncHandler(async (req, res) => {
   try {
     await User.findByIdAndDelete(req.params.id);
     res.status(200).json("User Deleted Successfuly.");
   } catch (err) {
     res.status(505).json(err);
   }
})

module.exports = { register, login, getAllUsers, deleteUser };
