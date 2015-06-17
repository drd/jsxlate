var React = require("react");
module.exports = {
	"Hello, <Awesome /> world!": function(Awesome) { return <span>¡Hola, mundo <Awesome />!</span>; },
	"AWESOME": function() { return <span>IMPRESIONANTE</span>; },
	"Choose locale:": function() { return <span>Eligir lugar:</span>; },
	"Translated <span:hello>{thing}</span:hello> Application": function(thing) { return <span>Applicacíon <span className="hello">{thing}</span> traducido</span>; },
	"awesome?": function() { return '\xBFimpresionante?'; }
};

