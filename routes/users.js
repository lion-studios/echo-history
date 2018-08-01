var express = require('express');
var lo = require('lodash');
var router = express.Router();

var LRU = require("lru-cache"),
    options = {
        max: 1000,
        //length: function(n, key) {
        //return n
        //},
        maxAge: 1000 * 60 * 60 * 6
    },
    cache = LRU(options)

router.post('/', function(req, res, next) {
    console.log('Hook entry', req.body);
    cache.set(new Date().toISOString(), req.body);
    res.json(req.body);
});

router.get('/', function(req, res, next) {
    if (req.headers['custom-auth'] === 'da2f073e06f78938166f247273729dfe465bf7e46105c13ce7cc651047bf0ca4') {
		console.log('Hook history lookup', cache.length);
		res.json(buildHistory());
    }

	else {
		res.status(401).json({
			err: 'invalidCredentials'
		});
	}
});

function buildHistory() {
    var history = [];
    cache.forEach((value, key) => {
        value = value || {};
        value.hookEntryTimeStamp = key;
        history.push(value);
    });
    return history;
}
module.exports = router;
