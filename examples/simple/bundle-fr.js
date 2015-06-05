var React = require("react");
module.exports = {
	"Hello, <Stupid /> world!": function(Stupid) { return <span>Bonjour le monde <Stupid />!</span>; },
	"STUPID": function() { return <span>STUPIDE</span>; },
	"Choose locale:": function() { return <span>Choisissez lieu:</span>; },
	"Translated {thing} Application": function(thing) { return <span>Demande traduit {thing}</span>; },
	"awesome?": function() { return 'terrifiant?'; }
};

