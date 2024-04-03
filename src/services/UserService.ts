import { contactPersons, contacters, users } from '../../mockData';
import { ContactPerson, Contacter, User } from '../types';

const getContactPersons: () => Promise<
  Record<string, ContactPerson>
> = async () => Object.fromEntries(contactPersons.map(x => [x.userId, x]));

const getUsers: () => Promise<Record<string, User>> = async () =>
  Object.fromEntries(users.map(x => [x.userId, x]));

const getUser: (id: number) => Promise<User | undefined> = async (id: number) =>
  users.find(u => u.userId === id);

const getDefaultContactPerson = () => contactPersons[0];

const addUser: (id: number) => Promise<User> = async (id: number) => {
  const newUser: Contacter = {
    userId: id,
    isContactPerson: false,
    isAdmin: false,
  };
  contacters.push(newUser);
  return newUser;
};

export {
  getContactPersons,
  getUsers,
  getUser,
  addUser,
  getDefaultContactPerson,
};
