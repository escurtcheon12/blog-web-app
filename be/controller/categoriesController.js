const Categories = require("../model/Categories");

module.exports = {
  index: function (req, res) {
    Categories.get(req.con, function (err, rows) {
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
    Categories.create(req.con, req.body, function (err, rows) {
      res.json({
        body: req.body,
        data: err || rows,
      });
    });
  },

  getId: function (req, res) {
    Categories.getById(req.con, req.params.id, function (err, rows) {
      res.json({
        data: rows,
      });
    });
  },

  update: function (req, res) {
    Categories.update(req.con, req.body, req.params.id, function (err, rows) {
      res.json({
        id: req.params.id,
        data: err || rows,
      });
    });
  },

  destroy: function (req, res) {
    Categories.destroy(req.con, req.params.id, function (err, rows) {
      res.json({
        data: rows,
      });
    });
  },

  count: function (req, res) {
    Categories.count(req.con, function (err, rows) {
      res.json({
        body: req.body,
        data: err || rows,
      });
    });
  },
};
