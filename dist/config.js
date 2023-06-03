"use strict";
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;
const baseURL = `http://localhost:${port}`;
module.exports = {
    JWTsecret: 'mysecret',
    baseURL: baseURL,
    port: port,
    oauth2Credentials: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        project_id: "App2",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uris: [
            `${baseURL}/auth_callback`
        ],
        scopes: [
            'https://www.googleapis.com/auth/userinfo.profile'
        ]
    }
};
