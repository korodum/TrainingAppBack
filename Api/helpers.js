const fs = require('fs/promises');
const path = require('path');

const generateError = (message, status)=>{
    const error = new Error(message);
    error.statusCode = status;
    return error;
};

const createPathIfNotExists = async (path) => {

    try {
        await fs.access(path);
    } catch {
        await fs.mkdir(path);
    }
};

const deletePhoto = async (photoName) => {

    try {
        const photoPath = path.join(__dirname,'uploads',photoName);

        await fs.unlink(photoPath);
    } catch {
        throw new Error ('Error deleting photo')
    }
}
module.exports = {
    generateError,
    createPathIfNotExists,
    deletePhoto
}