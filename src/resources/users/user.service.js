const { v4: uuidv4 } = require('uuid');
const usersRepo = require('./user.memory.repository');

async function getAllUsers() {
  const users = [];
  usersRepo.forEach((user) => {
      users.push(user);
  });
  return Promise.resolve(users);
}

async function getUser(userId) {
  const check = usersRepo.has(userId);
  if (!check) return Promise.resolve(null);
  const user = usersRepo.get(userId);
  return Promise.resolve(user);
}

async function createUser(newUser) {
  const check = newUser.name && newUser.login && newUser.password ;
  if (!check) return Promise.resolve(null);
  const id = uuidv4();
  const newRecord = {
    id,
    name: newUser.name,
    login: newUser.login,
    password: newUser.password
  }
  usersRepo.set(id, newRecord);
  return Promise.resolve(newRecord);
}

async function updateUser(newUser) {
  if (!newUser.id) return Promise.resolve(null);
  const check = usersRepo.has(newUser.id);
  if (!check) return Promise.resolve(null);
  const currentUser = usersRepo.get(newUser.id);
  const newRecord = {
      id: newUser.id,
      name: newUser.name? newUser.name: currentUser.name,
      login: newUser.login? newUser.login: currentUser.age,
      password: newUser.password? newUser.hobbies: currentUser.hobbies
  }
  usersRepo.set(newUser.id, newRecord);
  return Promise.resolve(newRecord);
}

async function deleteUser(userId) {
  const check = usersRepo.has(userId);
  if (!check) return Promise.resolve(null);
  const user = usersRepo.get(userId);
  usersRepo.delete(userId);
  return Promise.resolve(user);
}

module.exports = { 
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
