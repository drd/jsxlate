var React = require("react");
module.exports = {
	"Hello, <Stupid /> world!": function(Stupid) { return <span>¡Hola, mundo <Stupid />!</span>; },
	"STUPID": function() { return <span>ESTUPIDO</span>; },
	"Choose locale:": function() { return <span>Eligir lugar:</span>; },
	"Translated {thing} Application": function(thing) { return <span>Applicación traducido {thing}</span>; },
	"awesome?": function() { return '\xBFimpresionante?'; }
};

