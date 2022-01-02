const imageToBase64 = require('image-to-base64');

const parseImageToBase64String = async (path) => {
    return imageToBase64(path);
};

module.exports = parseImageToBase64String;