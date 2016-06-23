'use strict';

var AC = require('./ac-cjs');
var moment = require('moment')

AC.config.backgroundColor = 'lightblue';
AC.init('#load');

console.log(moment("20111031", "YYYYMMDD"));
