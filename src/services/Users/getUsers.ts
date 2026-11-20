import Users from "../../model/Users";

export const getUsers = async (_req, res) => {
    try {
        const users= await Users.findAll();
        res.status(201).json({ response:users, message: "Successful!" });
    } catch (error) {
        console.log("..error..", error);
        res.status(500).json({ message: "Something Went Wrong!" })
    }
}