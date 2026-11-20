import { DataTypes, UUID } from "sequelize";
import sequelize from "../config/database";

const Users= sequelize.define("Users",{
    UUID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: "users",
    timestamps: true
});

export default Users;