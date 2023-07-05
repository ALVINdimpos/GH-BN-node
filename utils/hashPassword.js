import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};
  
export const comparePassword = async (hash, password) => {
  try {
    const isMatch = await bcrypt.compare(hash, password);
    return isMatch;
  } catch (error) {
    throw new Error('password does not match');
  }
};

export const verifyPassword = async (hash, password) => {
  try {
    const isMatch = await bcrypt.compare(hash, password);
    return isMatch;
  } catch (error) {
    throw new Error('incorrect password');
  }
};
