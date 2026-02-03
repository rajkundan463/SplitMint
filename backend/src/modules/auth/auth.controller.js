const service = require("./auth.service");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await service.register(email, password);
    res.status(201).json(data);
    
  } catch (err) {
    if (err.message === "EMAIL_EXISTS") {
      return res.status(409).json({ error: "Email already registered" });
    }

    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await service.login(email, password);
    
    res.json(data);
  } catch (err) {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

module.exports = { register, login };
