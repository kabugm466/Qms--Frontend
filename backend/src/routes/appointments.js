const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');

// TODO: replace with real appointments endpoints (controllers/appointmentsController.js).
// Placeholder so the server boots and the route is reachable during development.
router.get('/', authenticate, (req, res) => {
  res.json({ message: 'appointments route not yet implemented' });
});

module.exports = router;
