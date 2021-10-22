const fs = require('fs');
const { internalServerError } = require('./errors-helper');

function deleteFile(path) {
    try {
        if (!path || !fs.existsSync(path)) return;
        fs.unlinkSync(path);
    } catch (err) {
        internalServerError(err);
    }
}

module.exports = {
    deleteFile
};