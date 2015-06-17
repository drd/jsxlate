var React = require("react");
module.exports = {
	"Hello, <Awesome /> world!": function(Awesome) { return <span>Bonjour, monde <Awesome />!</span>; },
	"AWESOME": function() { return <span>GÉNIAL</span>; },
	"Choose locale:": function() { return <span>Choisir une localité:</span>; },
	"Translated <span:hello>{thing}</span:hello> Application": function(thing) { return <span>Application Traduite <span className="hello">{thing}</span></span>; },
	"awesome?": function() { return 'Impressionnant?'; }
};

