module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) res.status(200).json({ success: false, message: 'Unauthorized' })
  else next()
}
