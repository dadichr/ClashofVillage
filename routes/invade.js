const router = require('express').Router();
const InvadeController = require('../controllers/invadeController')

router.post('/:id', InvadeController.invade);

module.exports = router; 