import User from "../models/User";
import bcrypt from "bcrypt";

export const getusers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
    console.log(users)
  } catch (error) {
    return console.log(error);
  }
  if (!users) {
    return res.status(404).json({ message: "No  users Found ! " });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log("this is in signup page", name, email, password);
  let existinguser;
  try {
    existinguser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  if (existinguser) {
    return res
      .status(200)
      .json({ message: "User already exists ! Login Instead" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = bcrypt.hashSync(password, salt);

  const user = new User({
    name,
    email,
    password: hashedpassword,
    blogs: [],
  });
  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existinguser;
  try {
    existinguser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  if (!existinguser) {
    return res.status(404).json({ message: "User not found by this email !" });
  }

  const iscorrectpassword = bcrypt.compareSync(password, existinguser.password);

  if (!iscorrectpassword) {
    return res.status(400).json({ message: "Incorrect Password !" });
  }
  return res
    .status(200)
    .json({ message: "Login Successfully Done !", user: existinguser });
};
