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
    if (req.headers['custom-auth'] === 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiaHBoRGVhbGVyIiwibnM6diI6InYxIiwibnM6dSI6IjNiZjNjYzFhLTMxMGQtNDJmYi05MWNkLTJjOTMzYmQ0MmUwMSIsIm5zOnNnaSI6W10sImlzcyI6Imh0dHBzOlwvXC9zcGlyZW9uLmNvbSIsIm5zOmFwcCI6IjEzMzczZDRjLWI3MDAtNGE2ZS1iMzEyLWNiZTlmNWJjNzIzMyIsIm5zOnJvbGUiOlsiUk9MRV9ERUFMRVIiLCJST0xFX1VTRVIiXSwiZXhwIjoxNTMzMjI1NDc2LCJuczp0IjoiYmhwaERlYWxlcisxMzM3M2Q0Yy1iNzAwLTRhNmUtYjMxMi1jYmU5ZjViYzcyMzMiLCJuczpwb2wiOiI1N2NlZTc4MDFhOGM2NTUwMTQwMDAwMDciLCJuczpiIjoidmVoaWNsZUZpbmFuY2UiLCJuczphIjoiMTQ0Nzk3NDI5MjMyMEVUMDY0VEoifQ.KcoPlF-oQerxa_B_y79ROY5TPdU42vnBopOPRsDaIyGcz8zZf79_qdSTuj4n8aBbTzJp-LYrjOpUh-MNuJ_1aeQ6flMScJ3GO7o0nj6IWmijYnFFPWLRBAp78MY-IyQ3zwzpIhDiENwVfxg0RicnyDCpbvrx1aIm0xOPgfjI0fbw_CEBoFtZSmd6gjWsWLMX6bo0oZwGwxfx_LdYFeBhIqXryGQPiEeSgR_97GXHFjNo6l-54OfwwO6vm1hM3mJqHNKzP-ynny6CE3-TAkMquaDs7jqn7Z0KZh9tf1__P0Tqq1W1EaewuNWUuh05SVk5XqSU2kfW2rxznloTTcQZYg') {
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
