import jwt from 'jsonwebtoken';
const { verify } = jwt;
const { SECRET_AUTH } = process.env;
export const isAutenticated = (req, res, next) => {
    try {
        const { AuthToken } = req.cookies;
        if (!AuthToken) {
            return res.status(401).send('Error: No Token');
        }
        const decodedToken = verify(AuthToken, `${SECRET_AUTH}`); //si este codigo no es valido lanza un (ERROR por eso hay que manejarlo con try catch)
        req.user = decodedToken.userCredentials;
        next();
    }
    catch (error) {
        res.status(401).send('Invalid Token');
    }
};
