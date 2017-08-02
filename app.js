'use strict'

const rp = require('request-promise');
const express = require('express');
const app = express();
const program = require('commander');
const bodyParser = require('body-parser');
const imageUrl = 'PLACE IMAGE'
const port = process.env.PORT || 3000
const apiKey = 'API KEY'

//program arguments
program
    .option('-a, --apiUrl [value]') //api url
    .option('-t, --total [value]') //total amount of requests
    .option('-h, --host [value]') //machine host url for callback
    .parse(process.argv);

const hostAddress = program.host;
const total = program.total;
const apiUrl = program.apiUrl;
console.log(total)
var i = 0
    //Listen for callback
app.listen(port, function() {
    console.log('listening on port', port)
});

//Parse incoming JSON
app.use(bodyParser.json());

app.post('/callback', function(req, res) {
    i++
    console.log(i)
    if (i == total) {
        console.timeEnd('total time');
    }
})

console.time('total time')
for (var x = 0; x < total; x++) {
    rp.post({
        method: 'POST',
        json: {
            "image_url": imageUrl,
            "callback_url": hostAddress + "/callback",
            "threshold": 10
        },
        url: apiUrl,
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey
        }
    });
}
