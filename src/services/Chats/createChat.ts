import UserChats from "../../model/UserChats";
import { v4 as uuidv4 } from "uuid";
export const createChat = async (req, res) => {
    try {
        let body = req.body;
        let participants = body.participants;
        let createdBy = body.createdBy;
        let response;
        if (body.isGroup === false) {
            response = await UserChats.findOrCreate({
                where: {
                    Users: participants,
                    isGroup: false,
                },
                defaults: {
                    UUID: uuidv4(),
                    isGroup: false,
                    UserUUID: createdBy
                }
            })
        } else {
            response = await UserChats.findOrCreate({
                where: {
                    Users: participants,
                    isGroup: true,
                },
                defaults: {
                    UUID: uuidv4(),
                    isGroup: true,
                    UserUUID: createdBy,
                    groupName: body.groupName
                }
            })
        }
        res.status(201).json({ chatId: response[0]["UUID"], "message": response[1] == false ? "Chat Already Exists" : "Successful!" });
    } catch (error) {
        res.status(500).json({ "err": error.errors ? error.errors[0].message : "Something went wrong!" });
    }
}