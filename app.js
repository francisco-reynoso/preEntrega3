const express = require('express');
const app = express();
const path = require('path');
const cors = require(`cors`);
const mercadopago = require(`mercadopago`);

mercadopago.configure({
	access_token: "<ACCESS_TOKEN>",
});



app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.set('port', (process.env.PORT || 2500));
app.use(express.static(path.join(__dirname, ''))); 


app.set("views", __dirname + '/views');
app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile);

const router = require('./routes/router')
app.use(router.routes)


app.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:2500",
			"failure": "http://localhost:2500",
			"pending": ""
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});
app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

app.listen(app.get('port'), () => {
    console.log( `servidor corriendo en el puerto ${app.get('port')}`);
})



