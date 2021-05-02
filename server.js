const express = require('express');
const path = require('path');
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({ target: 'http://immense-shore-27636.herokuapp.com', changeOrigin: true }));

app.use(cors())
app.use(express.static(__dirname + '/dist/frontend-prueba-tecnica'));

app.get('/*', (req,res,next) => {
    res.sendFile(path.join(__dirname + '/dist/frontend-prueba-tecnica/index.html'));
});


app.listen(process.env.PORT || 8000);
