const Blogs = require("../model/Blogs");
const env = require("dotenv");
env.config();

module.exports = {
  index: function (req, res) {
    Blogs.get(req.con, function (err, rows) {
      res.json({
        body: req.body,
        data: rows,
      });
    });
  },

  getBlogViewer: function (req, res) {
    Blogs.getBlogViewer(req.con, function (err, rows) {
      res.json({
        body: req.body,
        data: rows,
      });
    });
  },

  getBlogPublish: function (req, res) {
    Blogs.getBlogPublish(req.con, function (err, rows) {
      res.json({
        body: req.body,
        data: rows,
      });
    });
  },

  countViewer: function (req, res) {
    Blogs.countViewer(req.con, function (err, rows) {
      res.json({
        body: req.body,
        data: rows,
      });
    });
  },

  getCategoryId: function (req, res) {
    Blogs.getByCategoryId(req.con, req.params.id, function (err, rows) {
      res.json({
        data: rows,
      });
    });
  },

  create: function (req, res) {
    res.render("blogs/create");
  },

  store: function (req, res) {
    Blogs.create(req.con, req.body, req.file.filename, function (err, rows) {
      res.json({
        body: req.body,
        data: err || rows,
        file: req.file.filename,
      });
    });
  },

  getId: function (req, res) {
    Blogs.getById(req.con, req.params.id, function (err, rows) {
      res.json({
        data: rows,
      });
    });
  },

  update: function (req, res) {
    Blogs.update(
      req.con,
      req.body,
      req.file.filename,
      req.params.id,
      function (err, rows) {
        res.json({
          id: req.params.id,
          data: err || rows,
          file: req.file.filename,
        });
      }
    );
  },

  updateWithoutImage: function (req, res) {
    Blogs.updateWithoutImage(
      req.con,
      req.body,
      req.params.id,
      function (err, rows) {
        res.json({
          id: req.params.id,
          data: err || rows,
        });
      }
    );
  },

  addView: function (req, res) {
    Blogs.addView(req.con, req.body, function (err, rows) {
      res.json({
        body: req.body,
        data: err || rows,
      });
    });
  },

  destroy: function (req, res) {
    Blogs.destroy(req.con, req.params.id, function (err, rows) {
      res.json({
        data: err || rows,
      });
    });
  },

  count: function (req, res) {
    Blogs.count(req.con, function (err, rows) {
      res.json({
        body: req.body,
        data: err || rows,
      });
    });
  },

  countDrafts: function (req, res) {
    Blogs.countDrafts(req.con, function (err, rows) {
      res.json({
        body: req.body,
        data: err || rows,
      });
    });
  },

  countPublished: function (req, res) {
    Blogs.countPublished(req.con, function (err, rows) {
      res.json({
        body: req.body,
        data: err || rows,
      });
    });
  },
};
