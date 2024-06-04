const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new category
router.post('/',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), categoryController.createCategory);

// Retrieve all categories
// router.get('/',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), categoryController.getAllCategories);
router.get('/',categoryController.getAllCategories);

// Retrieve a category by ID
router.get('/:id',categoryController.getCategoryById);

// Update a category by ID
router.put('/:id',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), categoryController.updateCategoryById);

// Delete a category by ID
router.delete('/:id',authMiddleware.authenticateUser, authMiddleware.checkUserRole(['admin']), categoryController.deleteCategoryById);

module.exports = router;
