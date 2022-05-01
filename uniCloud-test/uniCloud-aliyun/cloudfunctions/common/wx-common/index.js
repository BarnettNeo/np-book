const appId = 'wxaaf200a34bd1c5e9';
const appSecret = '85c4098cf385176dddb7394a13ec0e35';

const jwt = require("jsonwebtoken")

function getToken(openid){
	return jwt.sign({openid:openid},appSecret,{expiresIn:60*60*24})
}

function verifyToken(token){
	return jwt.verify(token,appSecret)
}

module.exports = {
	appId,
	appSecret,
	getToken,
	verifyToken
}

