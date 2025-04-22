const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

// @desc Login a user
// @route POST /api/users/login
// @access public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email address and password is mandatory!");
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          email: user.email,
          id: user.id,
          role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {
          expiresIn: "6h",
        }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401);
      throw new Error("Invalid credentials. Please try again!");
    }
  } catch (error) {
    res.status(500)
    throw new Error(error.message);
  }
};

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  if (!firstName || !lastName || !email || !phone || !password) {
    res.status(400);
    throw new Error("Kindly fill in the mandatory details for registration.");
  }

  const isUserAvailable = await User.findOne({ email });

  if (isUserAvailable) {
    res.status(400);
    throw new Error("A user with this information already exists!");
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
  });

  console.log(`user created ${user}`);
  if (user) {
    res.json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("The received user data is not valid!");
  }
};

// @desc Private test route
// @route POST /api/users/private
// @access private
const privateTestRoute = (req, res) => {
  res.json(req.user);
};

module.exports = { loginUser, registerUser, privateTestRoute };
