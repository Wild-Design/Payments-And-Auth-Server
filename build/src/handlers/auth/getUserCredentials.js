import { User } from '../../db/index.js';
//Esta funcion solo retorna las credenciales que nececita la cookie
export default async (email) => {
    try {
        const userCredentials = await User.findOne({ where: { email } });
        return { email: userCredentials.email, password: userCredentials.password };
    }
    catch (error) {
        console.log(`Error in getUserCredentials: ${error.message}`);
        return null;
    }
};
