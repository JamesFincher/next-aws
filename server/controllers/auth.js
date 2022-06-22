exports.register = (req, res, next) => {
  res.json({
    status: 'success',
    message: 'User register page reached',
  });
};
