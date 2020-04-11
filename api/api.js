const controller = require('../controllers/controller');

module.exports = (io, socket, connectedUsers) => {
    socket.on('spin', (msg) => {
        console.log('got message: ', msg);
        randomIndex = controller.getRandomId(socket.id, connectedUsers);
        io.to(connectedUsers[randomIndex]).emit('privateMessage', msg);  
    });
    
    //send message to all users
    socket.on('blast', (msg) => {
        console.log('got message for all users: ', msg);
        io.emit('incomeMessage', msg);  
    });

    //send message to X random users
    socket.on('wild', (msgObj) => {
        let usersToEmit = controller.getNumOfRandomIds(socket.id, connectedUsers, msgObj.numOfUsers);
        for (let i = 0; i < usersToEmit.length; i++) {
            io.to(usersToEmit[i]).emit('privateMessage', msgObj.msg); 
        } 
    });
}