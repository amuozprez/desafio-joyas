const express = require('express');
const { getJoyas, getJoyasFiltradas } = require('../controllers/joyasController');
const router = express.Router();

router.get('/joyas', getJoyas);
router.get('/joyas/filtros', getJoyasFiltradas);

module.exports = router;


