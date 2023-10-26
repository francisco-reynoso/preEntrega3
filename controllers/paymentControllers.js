const mercadopago = require('mercadopago');

const creandoOrden = async (req,res) =>{
    mercadopago.configure({
        acces_token: 'TEST-8267447282247217-102511-d7db375a4dc382d3d589d3364afbfcdc-1523114237',
    });
    const result = await mercadopago.preferences.create({
        items:[
            {
                title:"sauvage dior",
                unit_price: 3000,
                currency_id: "ARS",
                quantity:1
            },
        ],
    });

    
    console.log(result);
    res.send("creando orden");
};

const pagoAceptado = (req,res) =>{
    res.sent("su pago fue aceptado");
};

const procesandoPago = (req,res) =>{
    res.sent("su pago esta siendo procesado");
};



module.exports = {
    creandoOrden,
    pagoAceptado,
    procesandoPago
};


