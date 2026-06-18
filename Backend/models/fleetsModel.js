import promissePool from "../config/db.js";

const model = {
  find: async function (user) {
    const [result] = await promissePool.query("SELECT * FROM users WHERE email = ?", [user.email]);
    return result;
  },
  create: async function (user) {
    const [result] = await promissePool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [user.name, user.email, user.password]);
    return { id: result.insertId, ...user };
  },
  update: async function (id, user) {
    const [result] = await promissePool.query("UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?", [user.name, user.email, user.password, id]);
    return { id, ...user };
  },
  delete: async function (id) {
    const [result] = await promissePool.query("DELETE FROM users WHERE id = ?",[id]);
    return result;
  },
};

export default model;
