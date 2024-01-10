import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import { figure, user, cart } from './models/index.js';
config();

const { USER, PASSWORD, HOST, DB_PORT, DB_NAME } = process.env;

const sequelize: Sequelize = new Sequelize(
  `postgres://${USER}:${PASSWORD}@${HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false }
);

figure(sequelize);
user(sequelize);
cart(sequelize);

export const { Figure, User, Cart } = sequelize.models;
User.hasMany(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Figure, { through: 'cart_figure' });
Figure.belongsToMany(Cart, { through: 'cart_figure' });

export default sequelize;
