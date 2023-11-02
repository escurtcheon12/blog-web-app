module.exports = {
  // get: function (con, callback) {
  //   con.query("SELECT * FROM blogs", callback);
  // },

  get: (con, callback) => {
    con.query("SELECT * FROM viewer", callback);
  },

  getById: function (con, id, callback) {
    con.query(`SELECT * FROM viewer WHERE viewers_id = ${id}`, callback);
  },

  create: function (con, data, callback) {
    con.query(
      `INSERT INTO viewer(viewers_os, viewers_time_accessed, blog_id) VALUES('${data.viewers_os}', '${data.viewers_time_accessed}', (SELECT blog_id from blog WHERE blog_id = '${data.blog_id}'))`,
      callback
    );
  },

  update: function (con, data, id, callback) {
    con.query(
      `UPDATE viewer SET viewers_os = '${data.viewers_os}', viewers_time_accessed = '${data.viewers_time_accessed}', blog_id = '${data.blog_id} WHERE viewers_id = ${id}`,
      callback
    );
  },

  destroy: function (con, id, callback) {
    con.query(`DELETE FROM viewer WHERE viewers_id = ${id}`, callback);
  },

  count: function (con, callback) {
    con.query(`SELECT COUNT(*) AS countViewers FROM viewer`, callback);
  },
};
