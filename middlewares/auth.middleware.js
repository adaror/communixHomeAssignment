const sqlProvider = require('../providers/sqlProvider');

async function authenticateUser(socket, next) {
    let handshakeQuery = socket.handshake && socket.handshake.query
    if (handshakeQuery && handshakeQuery.email && handshakeQuery.password) {
        const isValidate = await sqlProvider.validateUserByEmailAndPassword(handshakeQuery.email, handshakeQuery.password);
        if(isValidate) return next();
    }
    return next(new Error('User Not Authenticate'));
}

module.exports = {
    authenticateUser
}