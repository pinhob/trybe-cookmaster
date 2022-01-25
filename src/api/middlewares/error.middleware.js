const errorMiddleware = (err, req, res, _next) => {
  if (err.status) {
    const { status, message } = err;

    return res.status(status).json({ message });
  }

  console.log('err', err);

  return res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
};

module.exports = {
  errorMiddleware,
};
