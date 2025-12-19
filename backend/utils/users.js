const users = [];

// Join user to list

const addUser = ({name, roomId, userId, host, presenter, socketId}) => {
    const user = {name, roomId, userId, host, presenter, socketId};
    users.push(user);
    return getAllUsersInRoom(roomId);
}

// Remove user from list

const removeUser = (socketId) => {
    const index = users.findIndex((user) => user.socketId === socketId);
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
    return null;
}

// Get a user from the list

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
}

//Get all users from list

const getAllUsersInRoom = (roomId) => {
    return users.filter((user) => user.roomId === roomId);
}

module.exports = {addUser, removeUser, getUser, getAllUsersInRoom};