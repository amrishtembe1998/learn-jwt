import UserModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secretKey", {
    expiresIn: maxAge,
  });
};
const handleErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(
      ({ properties }) => (errors[properties.path] = properties.message)
    );
    return errors;
  }
  return errors;
};
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.create({ email: email, password: password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({
      user: user._id,
      created: true,
    });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userInfo = await UserModel.findOne({
      email: email,
      password: password,
    });
    if (!userInfo)
      res.status(404).json({ message: "No user found with these credentials" });
    next();
  } catch (error) {
    console.log(error);
  }
};
