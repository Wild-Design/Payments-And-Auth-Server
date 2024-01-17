import { User } from '../../db/index.js';
import { comparePassword } from '../../utils/passwordEncrypted.js';
/*Esta función la uso para verificar que este autenticado el usuario(Que el email
  que pasa en el cliente sea el mismo de la DB y que el password sea el mismo)*/
export default async (email, password) => {
    try {
        const findUser = await User.findOne({
            attributes: ['email', 'password'], //Solo traigo esos datos de la DB
            where: { email },
        });
        return findUser && comparePassword(password, findUser.password); //esto retorna true o null
    }
    catch (error) {
        console.log(`Error in the auth: ${error.message}`);
        return null;
    }
};
