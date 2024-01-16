import { User } from '../../db/index.js';
import { hashPassword } from '../../utils/passwordEncrypted.js';
export default async (req, res) => {
    try {
        req.body.password = hashPassword(req.body.password);
        const createUser = await User.create(req.body);
        res.status(200).send(createUser);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
