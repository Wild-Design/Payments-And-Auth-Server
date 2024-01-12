import hash from 'bcrypt';

export const hashPassword = (password: string): string =>
  hash.hashSync(password, 10);

export const comparePassword = (
  password: string,
  hashedPassword: string
): boolean => hash.compareSync(password, hashedPassword);
