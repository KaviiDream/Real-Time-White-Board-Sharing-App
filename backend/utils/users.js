const users = [];

// Join user to list

const addUser = ({name, roomId, userId, host, presenter}) => {
    const user = {name, roomId, userId, host, presenter};
    users.push(user);
    return users.filter((user) => user.roomId === roomId);
}

// Remove user from list

const removeUser = (userId) => {
    const index = users.findIndex((user) => user.userId === userId);
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
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