const bcrypt = require("bcryptjs");

let users = [
  {
    username: "admin",
    password: bcrypt.hashSync("12345", 10), // Contraseña encriptada
  },
  {
    username: "lino",
    password: bcrypt.hashSync("12345", 10), // Contraseña encriptada
  },
  {
    username: "jose",
    password: bcrypt.hashSync("12345", 10), // Contraseña encriptada
  },
];


function getUserByUsername(username) {
  return users.find((user) => user.username === username);
}

module.exports = {
  getUserByUsername
}