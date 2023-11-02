const Viewers = require("../model/Viewers");

module.exports = {
  index: function (req, res) {
    Viewers.get(req.con, function (err, rows) {
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
    Viewers.create(req.con, req.body, function (err, rows) {
      res.json({
        body: req.body,
        data: err || rows,
      });
    });
  },

  getId: function (req, res) {
    Viewers.getById(req.con, req.params.id, function (err, rows) {
      res.json({
        data: rows,
      });
    });
  },

  update: function (req, res) {
    Viewers.update(req.con, req.body, req.params.id, function (err, rows) {
      res.json({
        id: req.params.id,
        data: err || rows,
      });
    });
  },

  destroy: function (req, res) {
    Viewers.destroy(req.con, req.params.id, function (err, rows) {
      res.json({
        data: rows,
      });
    });
  },

  count: function (req, res) {
    Viewers.count(req.con, function (err, rows) {
      res.json({
        body: req.body,
        data: err || rows,
      });
    });
  },
};
