module.exports = {
  // get: function (con, callback) {
  //   con.query("SELECT * FROM blogs", callback);
  // },

  get: (con, callback) => {
    con.query("SELECT * FROM comment", callback);
  },

  getBlogId: (con, callback) => {
    con.query("SELECT * FROM comment ORDER by blog_id DESC", callback);
  },

  getById: function (con, id, callback) {
    con.query(`SELECT * FROM comment WHERE comment_id = ${id}`, callback);
  },

  create: function (con, data, callback) {
    con.query(
      `INSERT INTO comment(comment_name, comment_text,comment_date,blog_id) VALUES('${data.comment_name}','${data.comment_text}','${data.comment_date}', (SELECT blog_id from blog WHERE blog_id = '${data.blog_id}'))`,
      callback
    );
  },

  update: function (con, data, id, callback) {
    con.query(
      `UPDATE comment SET comment_name = '${data.comment_name}', comment_text = '${data.comment_text}', comment_date = '${data.comment_date}', blog_id = '${data.blog_id}' WHERE comment_id = ${id}`,
      callback
    );
  },

  destroy: function (con, id, callback) {
    con.query(`DELETE FROM comment WHERE comment_id = ${id}`, callback);
  },

  count: function (con, callback) {
    con.query(`SELECT COUNT(*) AS countComments FROM comment`, callback);
  },

  countUnread: function (con, callback) {
    con.query(
      `SELECT COUNT(*) AS countCommentsUnread FROM comment WHERE comment_read_status = 'unread'`,
      callback
    );
  },

  updateRead: function (con, data, callback) {
    con.query(
      `UPDATE comment SET comment_read_status = 'read' WHERE comment_read_status = 'unread'`,
      callback
    );
  },
};
