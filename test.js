var loader = require('.');


var output = loader('Hello ***cmsdata***! Hello ***more cmsdata***!');
console.log(['First', output, ''].join('\n'));

var output = loader('Hello **cmsdata**! Hello **more cmsdata**!');
console.log(['Second', output, ''].join('\n'));