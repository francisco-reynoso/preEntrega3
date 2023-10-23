const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('port', (process.env.PORT || 2500));
app.use(express.static(path.join(__dirname, 'public'))); 


app.set("views", __dirname + '/views');
app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile);

const router = require('./routes/router')
app.use(router.routes)

app.listen(app.get('port'), () => {
    console.log( `server running on port ${app.get('port')}`);
})