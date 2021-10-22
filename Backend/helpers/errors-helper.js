function internalServerError(response, err) {

    if(global.config.isDevelopment) {
        response.status(500).send(err.message);
        return;
    }

    response.status(500).send("Some error, please try again.");
}

module.exports = {
    internalServerError
};
