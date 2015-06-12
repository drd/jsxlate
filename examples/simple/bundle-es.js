var React = require("react");
module.exports = {
	"Hello, <Stupid /> world!": function(Stupid) { return <span>¡Hola, mundo <Stupid />!</span>; },
	"STUPID": function() { return <span>estupido</span>; },
	"Choose locale:": function() { return <span>Eligir lugar:</span>; },
	"Translated <span:hello>{thing}</span:hello> Application": function(thing) { return <span>Applicación traducido <span className="hello">{thing}</span></span>; },
	"awesome?": function() { return '\xBFimpresionante?'; }
};

