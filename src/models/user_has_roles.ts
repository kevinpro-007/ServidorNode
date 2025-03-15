import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/connection";


export const UserHasRoles = sequelize.define("user_has_roles",{
    ci: { type: DataTypes.INTEGER, primaryKey: true},
    codr: { type: DataTypes.INTEGER, primaryKey: true}
})