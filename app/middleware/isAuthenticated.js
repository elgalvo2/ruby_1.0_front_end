const jwt = require('jsonwebtoken');

function isAuthenticated(req, res,next){
    const access_token = req.headers.access_token;
    
    if(!access_token) return res.status(403).send({success: false, message:"User is not authorized"});

    const user = verifyAuthToken(access_token);
    if(!user) return res.status(401).send({success: false, message:"Not Authorized"});
    req.user=user;

    next();
};

function verifyAuthToken(token){
    var user = null;
    try{
        user = jwt.verify(token, process.env.TOKEN_SECRET);
    }catch(err){
        console.log(err)
    }

    return user;
    
}

module.exports = isAuthenticated;