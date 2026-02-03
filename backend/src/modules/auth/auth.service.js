const repo = require("./auth.repository");
const { hashPassword, comparePassword } = require("../../shared/utils/hash");
const { generateToken } = require("../../shared/utils/token");

const register = async (email, password) => {
  const existing = await repo.findUserByEmail(email);

  if (existing) {
    throw new Error("EMAIL_EXISTS");
  }

  const hashed = await hashPassword(password);

  const user = await repo.createUser(email, hashed);

  const token = generateToken(user);

  return { user, token };
};

const login = async (email, password) => {
  const user = await repo.findUserByEmail(email);

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const valid = await comparePassword(password, user.password);

  if (!valid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = generateToken(user);

  return { user, token };
};

module.exports = { register, login };