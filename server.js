const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const app = express();

app.use('/', serveStatic(path.join(__dirname, 'build')));

app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8081;
app.listen(port);
console.log(`app is listening on port: ${port}`);
