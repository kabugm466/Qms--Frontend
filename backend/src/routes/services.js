const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/serviceController');
const { authenticate } = require('../middleware/authenticate');
const { authorize } = require('../middleware/authorize');

// ── Institution admin (static path before /:id) ─────────────────────────────
router.get(
  '/mine',
  authenticate,
  authorize('institution_admin'),
  serviceController.listMine
);
router.post(
  '/',
  authenticate,
  authorize('institution_admin'),
  serviceController.create
);
router.put(
  '/:id',
  authenticate,
  authorize('institution_admin'),
  serviceController.update
);
router.patch(
  '/:id/status',
  authenticate,
  authorize('institution_admin'),
  serviceController.setStatus
);
router.delete(
  '/:id',
  authenticate,
  authorize('institution_admin'),
  serviceController.remove
);

// ── Public ───────────────────────────────────────────────────────────────────
router.get('/', serviceController.listPublicByInstitution);
router.get('/:id', serviceController.getPublicById);

module.exports = router;
