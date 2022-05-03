const { OAuth2Client } = require('google-auth-library')
require('dotenv').config()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

module.exports = client;
