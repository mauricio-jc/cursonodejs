require('@marko/compiler/register');
const express = require('express');
const cors = require('cors');
const markoPlugin = require('@marko/express').default;

const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(markoPlugin());

app.use('/statics', express.static('src/app/public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(cors());

const routes = require('../app/routing');
routes(app);

module.exports = app;