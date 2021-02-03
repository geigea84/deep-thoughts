//21.2.4
const jwt = require('jsonwebtoken');


/* If your JWT secret is ever compromised, you'll need to generate 
a new one, immediately invalidating all current tokens. Because the 
secret is so important, you should store it somewhere other than in 
a JavaScript file—like an environment variable. */
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },

    //21.2.5
    authMiddleware: function ({ req }) {
        //allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        //separate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) {
            token = token
                .split(' ')
                .pop()
                .trim();
        }

        //if no token, return request object as is
        if (!token) {
            return req;
        }

        try {
            //decode and attach user data to request object
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        }
        catch {
            console.log('Invalid token');
        }

        //return updated request object
        return req;
    }
}