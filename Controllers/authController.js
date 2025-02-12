const authService = require("../Services/authService");

exports.signup = async (req, res) => {
  try {
    const user = await authService.createUser(req.body,res);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await authService.loginUser(req.body,res);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.token = async (req, res) => {
  try {
    const token = await req.cookies
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.refreshToken = async(req,res)=>{
  const refreshToken = await authService.refreshingToken(req,res)
  return refreshToken;
}