let users: any = [];
let user_room: any = [];

// JOIN USER TO CHAT
export function userJoin (id: any, username: any, receipient: any) {
    let user: any = {id, username, receipient}
    users.push(user);    
    return user;
}

export function userJoinRoom (id: any, username: any, room: any) {
    let user_room: any = {id, username, room}
    users.push(user_room);    
    return user_room;
}



// GET CURRENT USER
export function getCurrentUser (id: any) {
    return users.find((user: { id: any; }) => user.id === id);
}