import { contactPersons, users } from '../../mockData';

const getContactPersons: () => Promise<
  Record<string, ContactPerson>
> = async () => Object.fromEntries(contactPersons.map(x => [x.userId, x]));

const getUsers: () => Promise<Record<string, User>> = async () =>
  Object.fromEntries(users.map(x => [x.userId, x]));

const addUser: () => Promise<Boolean> = async () => false;

export { getContactPersons, getUsers, addUser };
