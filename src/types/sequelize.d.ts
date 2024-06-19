import { Model } from 'sequelize';

declare module 'sequelize' {
  interface Sequelize {
    User: typeof Model;
  }
}
