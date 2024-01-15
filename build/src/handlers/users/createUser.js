import { User } from '../../db/index.js';
export default async (req, res) => {
    try {
        const createUser = await User.create(req.body);
        res.status(200).send(createUser);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
