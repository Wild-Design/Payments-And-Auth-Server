export default (req, res, next) => {
    const { email, password } = req.body;
    try {
    }
    catch (error) {
        res.status(500).send(error.messaje);
    }
};
