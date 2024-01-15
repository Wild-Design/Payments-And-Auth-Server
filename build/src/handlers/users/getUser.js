import { User } from '../../db/index.js';
export default async (_req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send(`Error in the server getUser: ${error.message}`);
    }
};
