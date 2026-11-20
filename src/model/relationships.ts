import Users from "./Users";
import UserChats from "./UserChats";
// import Chats from "./Chats";

Users.hasMany(UserChats);
// Chats.belongsTo(Users);

export {Users,UserChats}
