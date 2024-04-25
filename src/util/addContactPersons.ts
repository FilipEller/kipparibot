import { sequelize } from '../db';
import User from '../models/User';
import { contactPersons } from './contactPersons';

const main = async () => {
  await sequelize.sync();
  await Promise.all(
    contactPersons.map(async contactPerson => {
      const {
        userId: id,
        firstName,
        lastName,
        username,
        isContactPerson,
        isAdmin,
      } = contactPerson;
      return User.create({
        id,
        firstName,
        lastName,
        username,
        isContactPerson,
        isAdmin,
      });
    }),
  );
  await sequelize.close();
  process.exit(0);
};

main();
