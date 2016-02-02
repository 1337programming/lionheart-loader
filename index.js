var loaderUtils = require('loader-utils');

module.exports = function(content) {
    var query = loaderUtils.parseQuery(this.query);
    var start = query.start || '***';
    var end = query.end || '***';

    while (contains(content, start) && containsEnd(content, start, end) && firstIsBeforeSecond(content, start, end)) {
    	var key = parseKey(content, start, end);
    	var value = lookupValue(key);
    	var startEscaped = escapeRegExp(start);
    	var keyEscaped = escapeRegExp(key);
    	var endEscaped = escapeRegExp(end);
    	var regex = new RegExp(startEscaped + '\\s*?' + keyEscaped + '\\s?' + endEscaped, 'g');
    	content = content.replace(regex, value);
    }

    return content;
};


function contains(content, value) {
    return i(content, value) !== -1;
}

function containsEnd(content, start, end) {
	//Trim off first tag
	var sub = content.substring(i(content, start) + start.length);

	return i(sub, end) !== -1;
}

function firstIsBeforeSecond(content, first, second) {
    return i(content, first) <= i(content, second);
}

function i(content, value) {
    return content.indexOf(value);
}

function parseKey(content, start, end) {
	var startIndex = i(content, start) + start.length;
	var sub = content.substring(startIndex);

	var endIndex = i(sub, end);
	var key = sub.substring(0, endIndex).trim();
	return key;
}

function lookupValue(key) {
	return 'Value for ' + key;
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}