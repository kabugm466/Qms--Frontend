const Joi = require('joi');
const serviceService = require('../services/serviceService');

const createSchema = Joi.object({
  name: Joi.string().min(2).max(150).required(),
  description: Joi.string().max(500).allow('', null),
  durationMinutes: Joi.number().integer().min(5).max(480).default(30),
  price: Joi.number().min(0).default(0),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2).max(150),
  description: Joi.string().max(500).allow('', null),
  durationMinutes: Joi.number().integer().min(5).max(480),
  price: Joi.number().min(0),
}).min(1);

const statusSchema = Joi.object({
  isActive: Joi.boolean().required(),
});

// ── Public ───────────────────────────────────────────────────────────────────
async function listPublicByInstitution(req, res, next) {
  try {
    const { institutionId } = req.query;
    if (!institutionId) {
      return res.status(400).json({ error: 'institutionId query parameter is required' });
    }
    const services = await serviceService.listPublicByInstitution(institutionId);
    res.json({ services });
  } catch (err) {
    next(err);
  }
}

async function getPublicById(req, res, next) {
  try {
    const service = await serviceService.getPublicById(req.params.id);
    res.json({ service });
  } catch (err) {
    next(err);
  }
}

// ── Institution admin ────────────────────────────────────────────────────────
async function listMine(req, res, next) {
  try {
    const services = await serviceService.listMine(req.user.id);
    res.json({ services });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { error, value } = createSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const service = await serviceService.create(req.user.id, value);
    res.status(201).json({ service });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { error, value } = updateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const service = await serviceService.update(req.user.id, req.params.id, value);
    res.json({ service });
  } catch (err) {
    next(err);
  }
}

async function setStatus(req, res, next) {
  try {
    const { error, value } = statusSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const service = await serviceService.setStatus(req.user.id, req.params.id, value.isActive);
    res.json({ service });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await serviceService.remove(req.user.id, req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listPublicByInstitution, getPublicById, listMine, create, update, setStatus, remove };
