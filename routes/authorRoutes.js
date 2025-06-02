const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorControllers');

router.get('/', authorController.getAuthors);
router.put('/:id', authorController.updateAuthor);

module.exports = router;
