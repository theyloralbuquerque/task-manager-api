const notFoundError = (res) => {
    return res.status(404).send('Dado não encontrado.');
};

module.exports = {
    notFoundError,
};
