const express = require('express');
const path = require('path');

const app = express();

const env = path.join(__dirname, './src/configs/env', process.NODE_ENV || 'development');

require(env)(app);

require('./src')(app);

app.listen(app.settings.port, app.settings.host, () => {
    console.log(`Express server has been strated at host => ${app.settings.host} port => ${app.settings.port}`)
})