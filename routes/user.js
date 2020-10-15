const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.get('/', userController.registerFind);
router.get('/:UserId', userController.registerFindId)
router.put('/:UserId', userController.registerModify)
router.delete('/:UserId', userController.registerDelete)
router.post('/login', userController.login);


module.exports = router;