import { UUIDV4 } from 'sequelize';
import { DataTypes } from 'sequelize';
export default (sequelize) => {
    sequelize.define('Doll', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        in_stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
};
