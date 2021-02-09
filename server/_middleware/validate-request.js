module.exports = validateRequest;

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    let body;

    if (req.files) {
        const { data } = req.files.image
        body = {...req.body, image: data}
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