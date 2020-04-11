function getRandomId(id, connectedUsers) {
   const numberOfUsers = connectedUsers.length;
   let selectedUser = null;

   while (selectedUser === null) {
    let randomNumber =  Math.floor(Math.random() * numberOfUsers);
    if (connectedUsers[randomNumber] !== id) {
        return randomNumber;
    }
   }
}

function getNumOfRandomIds(currentId, connectedUsers, numOfIds) {
    let randomUsers = [];
    let users = Array.from(connectedUsers);
    while (randomUsers.length !== numOfIds) {
        let randomNumber =  Math.floor(Math.random() * users.length);
        if (users[randomNumber] !== currentId) {
            randomUsers.push(users[randomNumber]);
            users.splice(randomNumber, 1);
        }
    }

    return randomUsers;
}


module.exports = {
    getRandomId,
    getNumOfRandomIds
}