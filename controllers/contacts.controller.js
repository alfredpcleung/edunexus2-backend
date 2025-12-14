// ...existing code...
const Contact = require('../models/contact.model');
const createError = require('http-errors');

// GET all contacts
exports.getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) { next(err); }
};

// GET contact by ID
exports.getById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return next(createError(404, 'Contact not found'));
    res.json(contact);
  } catch (err) { next(err); }
};


// POST create new contact
exports.create = async (req, res, next) => {
  try {
    // ...existing code...
    const { title, description, review } = req.body;
    if (!title || !description || !review) {
      return next(createError(400, 'title, description, and review are required'));
    }
    const data = { ...req.body, owner: req.user.userId };
    const newContact = await Contact.create(data);
    res.status(201).json(newContact);
  } catch (err) { next(err); }
};


// PUT update contact by ID
exports.updateById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return next(createError(404, 'Contact not found'));
    if (!(req.user.isAdmin || String(contact.owner) === req.user.userId)) {
      return next(createError(403, 'Forbidden'));
    }
    const { title, description, review } = req.body;
    if (!title || !description || !review) {
      return next(createError(400, 'title, description, and review are required'));
    }
    const updated = await Contact.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) { next(err); }
};


// DELETE contact by ID
exports.removeById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return next(createError(404, 'Contact not found'));
    if (!(req.user.isAdmin || String(contact.owner) === req.user.userId)) {
      return next(createError(403, 'Forbidden'));
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted' });
  } catch (err) { next(err); }
};

// DELETE all contacts
exports.removeAll = async (req, res, next) => {
  try {
    const result = await Contact.deleteMany({});
    res.json({ deletedCount: result.deletedCount });
  } catch (err) { next(err); }
};