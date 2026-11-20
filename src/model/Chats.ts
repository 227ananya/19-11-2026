import { DataTypes, UUID } from "sequelize";
import sequelize from "../config/database";

const Chats= sequelize.define("Chats",{
    UUID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUID,
        allowNull: false
    },
    CreatedBy: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: "chats",
    timestamps: true
});

export default Chats;