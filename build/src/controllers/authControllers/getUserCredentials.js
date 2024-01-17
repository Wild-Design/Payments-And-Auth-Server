import { User } from '../../db/index.js';
//Esta funcion solo retorna las credenciales que nececita la cookie
export default async (email) => {
    try {
        const userCredentials = await User.findOne({
            attributes: ['id'], //Solo guardo el id en la cookie (podria guardar mas datos pero creo que esta bien con solo el id)
            where: { email },
        });
        return userCredentials;
    }
    catch (error) {
        console.log(`Error in getUserCredentials: ${error.message}`);
        return null;
    }
};
