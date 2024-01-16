import { User } from '../../db/index.js';

interface UserCredentials {
  email: string;
  password: string;
}

//Esta funcion solo retorna las credenciales que nececita la cookie

export default async (email: string): Promise<UserCredentials | null> => {
  try {
    const userCredentials: any = await User.findOne({ where: { email } });
    return { email: userCredentials.email, password: userCredentials.password };
  } catch (error: any) {
    console.log(`Error in getUserCredentials: ${error.message}`);
    return null;
  }
};
