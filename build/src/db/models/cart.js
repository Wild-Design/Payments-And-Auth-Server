import { DataTypes, UUIDV4 } from 'sequelize';
export default (sequelize) => {
    sequelize.define('Cart', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
        },
        purchase: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        purchase_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: false,
    });
};
