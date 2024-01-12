import hash from 'bcrypt';
export const hashPassword = (password) => hash.hashSync(password, 10);
export const comparePassword = (password, hashedPassword) => hash.compareSync(password, hashedPassword);
