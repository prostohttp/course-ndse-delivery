const errorHandler = (err, req, res) => {
  res.status(500).json({ error: err.message });
};

module.exports = errorHandler;
