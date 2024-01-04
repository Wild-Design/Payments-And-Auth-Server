export const getUser = (_req, res) => {
    try {
        res.status(200).send('getUser OK');
    }
    catch (error) {
        res.status(500).send(`Error en el server getUser: ${error.message}`);
    }
};
