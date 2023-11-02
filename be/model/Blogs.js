module.exports = {
  // get: function (con, callback) {
  //   con.query("SELECT * FROM blogs", callback);
  // },

  get: (con, callback) => {
    con.query("SELECT * FROM blog ORDER BY blog_date DESC", callback);
  },

  getBlogViewer: (con, callback) => {
    con.query(
      "SELECT * FROM blog WHERE blog_status = 'Publish' ORDER BY viewer_id DESC",
      callback
    );
  },

  getBlogPublish: (con, callback) => {
    con.query(
      "SELECT * FROM blog WHERE blog_status = 'Publish' ORDER BY blog_date DESC;",
      callback
    );
  },

  countViewer: (con, callback) => {
    con.query("SELECT viewer_id FROM blog WHERE viewer_id > 0", callback);
  },

  getById: function (con, id, callback) {
    con.query(`SELECT * FROM blog WHERE blog_id = ${id}`, callback);
  },

  getByCategoryId: function (con, id, callback) {
    con.query(
      `SELECT * FROM blog WHERE category_id = ${id} ORDER BY blog_date DESC`,
      callback
    );
  },

  create: function (con, data, files, callback) {
    con.query(
      `INSERT INTO blog(blog_title, blog_content, blog_image, blog_date, blog_author, blog_status, category_id) VALUES('${data.blog_title}', '${data.blog_content}','${files}', '${data.blog_date}', '${data.blog_author}', '${data.blog_status}', (SELECT category_id from category WHERE category_id = '${data.category_id}'))`,
      callback
    );
  },

  update: function (con, data, files, id, callback) {
    con.query(
      `UPDATE blog SET blog_title = '${data.blog_title}', blog_content = '${data.blog_content}', blog_image = '${files}', blog_date = '${data.blog_date}', blog_author = '${data.blog_author}' , blog_status = '${data.blog_status}', category_id = '${data.category_id}' WHERE blog_id = ${id}`,
      callback
    );
  },

  updateWithoutImage: function (con, data, id, callback) {
    con.query(
      `UPDATE blog SET blog_title = '${data.blog_title}', blog_content = '${data.blog_content}', blog_date = '${data.blog_date}', blog_author = '${data.blog_author}' , blog_status = '${data.blog_status}', category_id = '${data.category_id}' WHERE blog_id = ${id}`,
      callback
    );
  },

  addView: function (con, data, callback) {
    con.query(
      `UPDATE blog SET viewer_id = '${data.viewer_id}' WHERE blog_id = ${data.blog_id};`,
      callback
    );
  },

  destroy: function (con, id, callback) {
    con.query(`DELETE FROM blog WHERE blog_id = ${id}`, callback);
  },

  count: function (con, callback) {
    con.query(`SELECT COUNT(*) AS countBlogs FROM blog`, callback);
  },

  countDrafts: function (con, callback) {
    con.query(
      `SELECT COUNT(*) AS countDrafts FROM blog WHERE blog_status = 'Draft'`,
      callback
    );
  },

  countPublished: function (con, callback) {
    con.query(
      `SELECT COUNT(*) AS countPublished FROM blog WHERE blog_status = 'Publish'`,
      callback
    );
  },
};
