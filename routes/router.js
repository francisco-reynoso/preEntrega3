const express = require('express');

const {vistaPrincipal} = require('../controllers/pageControllers');
const { creandoOrden, pagoAceptado,procesandoPago } = require('../controllers/paymentControllers');
const router = express.Router();

router.get('/', vistaPrincipal)

router.get("/create-order", creandoOrden);
router.get("/succes", pagoAceptado);
router.get("/procesando", procesandoPago);


module.exports = {routes: router};