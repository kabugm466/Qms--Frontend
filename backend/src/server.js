require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const { errorHandler }   = require('./middleware/errorHandler');
const authRoutes          = require('./routes/auth');
const institutionRoutes   = require('./routes/institutions');
const serviceRoutes       = require('./routes/services');
const appointmentRoutes   = require('./routes/appointments');
const staffRoutes         = require('./routes/staff');
const notificationRoutes  = require('./routes/notifications');
const analyticsRoutes     = require('./routes/analytics');
const adminRoutes         = require('./routes/admin');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin:      process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status:    'ok',
    message:   'Jipange API is running',
    timestamp: new Date(),
  });
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',          authRoutes);
app.use('/api/institutions',  institutionRoutes);
app.use('/api/services',      serviceRoutes);
app.use('/api/appointments',  appointmentRoutes);
app.use('/api/staff',         staffRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics',     analyticsRoutes);
app.use('/api/admin',         adminRoutes);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use(errorHandler);

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Jipange API running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;