import express from 'express';
const router = express.Router();

import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/bills');
const Schema = mongoose.Schema;

var _User = new Schema({
    a: {type: String, required: true},
    b: { type: String, required: true }
});

const User = mongoose.model('User', _User);

var user = new User({
    name: 'lijle',
});

router.get('/', function(req, res) {
    user.save((err, result)=> {

    });
});

export default router;
