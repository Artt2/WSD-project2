import {sql} from "../database/database.js"

/*
  This service is for users, for registrationController.js and loginController.js
*/

const addUser = async (email, password) => {
  await sql`INSERT INTO users (email, password) VALUES (${email}, ${password})`; //TODO: DO THIS
};

const findUserByEmail = async (email) => {
  const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
  return rows;
};

export {addUser, findUserByEmail};