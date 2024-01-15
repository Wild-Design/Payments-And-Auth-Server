import { User } from '../db/index.js';
export default async (email, password) => {
    try {
        const getUser = await User.findOne({ where: { email } });
        if (getUser && getUser.password === password) {
            return true;
        }
        return false;
    }
    catch (error) {
        console.log(error.messaje);
        return false;
    }
};
