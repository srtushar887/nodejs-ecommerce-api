const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');


function authJwt(){
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret : secret,
        algorithms: ['HS256'],
        isRevoked:isRevoked
    }).unless({
        path:[
            {url:/\/api\/v1\/products(.*)/,method:['GET','OPTIONS']},
            {url:/\/api\/v1\/categories(.*)/,method:['GET','OPTIONS']},
            `${api}/user/login`,
            `${api}/user/register`,
        ]
    });
};

module.exports = authJwt;


async function isRevoked(req,payload,done){
    if(!payload.isAdmin){
        done(null,true)
    }
    done();
}



// const authJwt = function(req, res, next){
//     //get token from header
//     const token = req.header('x-auth-token');

//     //check if not token
//     if(!token){
//         return res.status(401).json({msg : "No token , authorization denied"});
//     }
//     //verify token
//     try {
//         const decoded = jwt.verify(token, process.env.secret);

//         req.user = decoded.user;
//         next();
//     } catch (error) {
//         res.status(401).json({msg : 'token is not valid'});
//     }

// };

// module.exports = authJwt;

