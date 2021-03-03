const fs = require("fs");

module.exports = validateRequest;

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    let body;
    if (req.body.image) {
        const { image } = req.body
        const imageBuff = decodeBase64Image(image).data
        
        body = {...req.body, image: imageBuff}
    } else {
        body = {...req.body }
    }
    const { error, value } = schema.validate(body, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
  
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
  
    response.type = matches[1];
    response.data = new Buffer.from(matches[2], 'base64');
  
    return response;
}