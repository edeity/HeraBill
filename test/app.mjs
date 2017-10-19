import express from 'express';
const app = express();

import users from './routes/users.mjs';

app.use('/users', users);

app.get('/', function (req, res) {
    
});

var server = app.listen(8080, () => {});
