'use strict';

var fhWeb = require('fhw-web');

fhWeb.start({
    "port": 8080,
    "validator": {
        "html": true,
        "css": true
    }
});
