import { User } from '../../db/index.js';
export const getUser = async (_req, res) => {
    try {
        const users = await User.findAll();
        console.log(users);
        res.status(200).send('getUser OK');
    }
    catch (error) {
        res.status(500).send(`Error en el server getUser: ${error.message}`);
    }
};
