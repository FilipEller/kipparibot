import User from '../models/User';

const getContactPersons: () => Promise<Record<number, User>> = async () => {
  const contactPersons = await User.findAll({
    where: { isContactPerson: true },
  });
  return Object.fromEntries(contactPersons.map(x => [x.id, x]));
};

const getUser: (id: number) => Promise<User | null> = async (id: number) =>
  User.findByPk(id);

const addUser: (id: number) => Promise<User> = async (id: number) => {
  return User.create({ id, isContactPerson: false, isAdmin: false });
};

export { getContactPersons, getUser, addUser };
