const expressJwt = require('express-jwt');
const config = require('../config.json');
const adminService = require('../service/adminService');
 
module.exports = jwt;
 
function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/login',
            '/front-page',
            '/contact',
            '/',
            '/runtime.js',
            '/polyfills.js',
            '/styles.js',
            '/vendor.js',
            '/images',
            '/main.js'

        ]
    });
}
 
async function isRevoked(req, payload, done) {
    const admin = await adminService.getById(payload.sub);
 
    // revoke token if user no longer exists
    if (!admin) {
        return done(null, true);
    }
 
    done();
};