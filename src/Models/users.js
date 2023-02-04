const Pool = require("./../config/db");

const create = (data) => {
  const { id_user, name_user, email, password, otp } = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO users(id_user,name_user,email,password,verif,otp) VALUES('${id_user}','${name_user}','${email}','${password}',0,${otp})`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users where email='${email}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const verification = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users SET verif=1 WHERE email='${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const changePassword = (email, password) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users SET password='${password}' WHERE email='${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const updateProfile = (data) => {
  const { id_user, username, bio, phone, photo } = data;
  return Pool.query(
    `UPDATE users SET username='${username}',bio='${bio}',phone=${phone},photo='${photo}' WHERE id_user='${id_user}'`
  );
};

const getDataById = (id_user) => {
  console.log(id_user);
  return Pool.query(`SELECT * FROM users WHERE id_user = '${id_user}'`);
};

const getAll = () => {
  return Pool.query(`SELECT * FROM users`);
};

module.exports = {
  create,
  findEmail,
  verification,
  changePassword,
  updateProfile,
  getDataById,
  getAll,
};
