import { Op } from "sequelize";
import UserChats from "../../model/UserChats";
import Users from "../../model/Users";

export const getChats = async (req, res) => {
    try {
        const chats = await UserChats.findAll({
            where: {
                Users: {
                    [Op.contains]: [req.params.userid]
                }
            }
        });
        let users = Array.from(new Set(chats.flatMap(items => items["Users"])));

        let allusers = await Users.findAll({
            where: {
                UUID: {
                    [Op.in]: users
                }
            }
        });
        let data = chats.map((each) => {
            return {
                uuid: each["UUID"],
                users: each["Users"].map((u) => {
                    let userss = allusers.find(v => v["UUID"] === u);
                    return {
                        userId: userss["UUID"],
                        name: userss["name"]
                    };
                }),
                isGroup: each["isGroup"],
                ...(each["isGroup"]===true ? {groupName : each["groupName"]}:{})
            }
        });
        res.status(200).json({ response: data, "message": "Successful!" });
    } catch (error) {
        console.log("...error..", error);
        res.status(500).json({ "err": error.errors ? error.errors[0].message : "Something went wrong!" });
    }
}