import { User } from '../../db/index.js';
import { comparePassword } from '../../utils/passwordEncrypted.js';

/*Esta función la uso para verificar(Que el email
  que pasa en el cliente sea el mismo de la DB y que el password sea el mismo)*/

export default async (
  email: string,
  password: string
): Promise<true | null> => {
  try {
    const findUser: any = await User.findOne({
      attributes: ['email', 'password'], //Solo traigo esos datos de la DB
      where: { email },
    });

    return findUser && comparePassword(password, findUser.password); //Comparo el password del cliente para saber si es correcto con el del hash
  } catch (error: any) {
    console.log(`Error in the auth: ${error.message}`);
    return null;
  }
};
