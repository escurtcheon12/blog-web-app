const Comments = require("../model/Comments");

module.exports = {
  index: function (req, res) {
    Comments.get(req.con, function (err, rows) {
      res.json({
        body: req.body,
        data: rows,
      });
    });
  },

  getBlogId: function (req, res) {
    Comments.getBlogId(req.con, function (err, rows) {
      res.json({
        body: req.body,
        data: rows,
      });
    });
  },

  create: function (req, res) {
    res.render("blogs/create");
  },

  store: function (req, res) {
    Comments.create(req.con, req.body, function (err, rows) {
      res.json({
        body: req.body,
        data: err || rows,
      });
    });
  },

  getId: function (req, res) {
    Comments.getById(req.con, req.params.id, function (err, rows) {
      res.json({
        data: rows,
      });
    });
  },

  update: function (req, res) {
    Comments.update(req.con, req.body, req.params.id, function (err, rows) {
      res.json({
        id: req.params.id,
        data: err || rows,
      });
    });
  },

  destroy: function (req, res) {
    Comments.destroy(req.con, req.params.id, function (err, rows) {
      res.json({
        data: rows,
      });
    });
  },

  count: function (req, res) {
    Comments.count(req.con, function (err, rows) {
      res.json({
        body: req.body,
        data: err || rows,
      });
    });
  },

  countUnread: function (req, res) {
    Comments.countUnread(req.con, function (err, rows) {
      res.json({
        body: req.body,
        data: err || rows,
      });
    });
  },

  updateRead: function (req, res) {
    Comments.updateRead(req.con, req.body, function (err, rows) {
      res.json({
        body: req.body,
        data: err || rows,
      });
    });
  },
};
