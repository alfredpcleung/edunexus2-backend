const Project = require('../models/project.model');
const mongoose = require('mongoose');
const createError = require('http-errors');

// GET all
exports.getAll = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) { next(err); }
};

// GET by ID
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid ID format'));
    }
    const project = await Project.findById(id);
    if (!project) return next(createError(404, 'Project not found'));
    res.json(project);
  } catch (err) { next(err); }
};

// POST create
exports.create = async (req, res, next) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (err) { next(err); }
};

// PUT update
exports.updateById = async (req, res, next) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!updated) return next(createError(404, 'Project not found'));
    res.json(updated);
  } catch (err) { next(err); }
};

// DELETE by ID
exports.removeById = async (req, res, next) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return next(createError(404, 'Project not found'));
    res.json({ message: 'Project deleted' });
  } catch (err) { next(err); }
};

// DELETE all
exports.removeAll = async (req, res, next) => {
  try {
    const result = await Project.deleteMany({});
    res.json({ deletedCount: result.deletedCount });
  } catch (err) { next(err); }
};