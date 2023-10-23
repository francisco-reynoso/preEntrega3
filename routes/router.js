const express = require('express');

const {vistaPrincipal} = require('../controllers/pageControllers')
const router = express.Router();

router.get('/', vistaPrincipal)

module.exports = {routes: router};