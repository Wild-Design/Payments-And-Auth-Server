export default (req, res) => {
    const user = req.body;
    try {
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
