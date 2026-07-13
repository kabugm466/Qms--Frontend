const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');

// TODO: replace with real admin endpoints (controllers/adminController.js).
// Placeholder so the server boots and the route is reachable during development.
router.get('/', authenticate, (req, res) => {
  res.json({ message: 'admin route not yet implemented' });
});

module.exports = router;
