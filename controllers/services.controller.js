const Service = require('../models/service.model');
const mongoose = require('mongoose');
const createError = require('http-errors');

// GET all
exports.getAll = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) { next(err); }
};

// GET by ID
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid ID format'));
    }
    const service = await Service.findById(id);
    if (!service) return next(createError(404, 'Service not found'));
    res.json(service);
  } catch (err) { next(err); }
};

// POST create
exports.create = async (req, res, next) => {
  try {
    const newService = await Service.create(req.body);
    res.status(201).json(newService);
  } catch (err) { next(err); }
};

// PUT update
exports.updateById = async (req, res, next) => {
  try {
    const updated = await Service.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!updated) return next(createError(404, 'Service not found'));
    res.json(updated);
  } catch (err) { next(err); }
};

// DELETE by ID
exports.removeById = async (req, res, next) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return next(createError(404, 'Service not found'));
    res.json({ message: 'Service deleted' });
  } catch (err) { next(err); }
};

// DELETE all
exports.removeAll = async (req, res, next) => {
  try {
    const result = await Service.deleteMany({});
    res.json({ deletedCount: result.deletedCount });
  } catch (err) { next(err); }
};