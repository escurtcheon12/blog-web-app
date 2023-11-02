module.exports = {
  // get: function (con, callback) {
  //   con.query("SELECT * FROM blogs", callback);
  // },

  get: (con, callback) => {
    con.query("SELECT * FROM category", callback);
  },

  getById: function (con, id, callback) {
    con.query(`SELECT * FROM category WHERE category_id = ${id}`, callback);
  },

  create: function (con, data, callback) {
    con.query(
      `INSERT INTO category(category_name) VALUES('${data.category_name}')`,
      callback
    );
  },

  update: function (con, data, id, callback) {
    con.query(
      `UPDATE category SET category_name = '${data.category_name}' WHERE category_id = ${id}`,
      callback
    );
  },

  destroy: function (con, id, callback) {
    con.query(`DELETE FROM category WHERE category_id = ${id}`, callback);
  },

  count: function (con, callback) {
    con.query(`SELECT COUNT(*) AS countCategories FROM category`, callback);
  },
};
