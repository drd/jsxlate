var React = require("react");
module.exports = {
	"awesome?": function() { return "Impressionnant?"; },
	"Translated <span:hello>{thing}</span:hello> Application": function(thing) { return <span>Application Traduite <span className="hello">{thing}</span></span>; },
	"Choose locale:": function() { return <span>Choisir une localité:</span>; },
	"AWESOME": function() { return <span>GÉNIAL</span>; },
	"Hello, <Awesome /> world!": function(Awesome) { return <span>Bonjour, monde <Awesome foo="bar" bar={{ foo: 'bar' }} />!</span>; },
	"<Pluralize:items>\n                <Match when=\"=0\">You have no items in your cart</Match>\n                <Match when=\"one\">You have one item in your cart</Match>\n                <Match when=\"other\">You have {this.state.count} items in your cart</Match>\n            </Pluralize:items>": function(Pluralize, Match) { return <span>
    <Pluralize on={this.state.count}>
                <Match when="=0">Vous avez rien dans votre panier</Match>
                <Match when="one">Vous avez un article dans votre panier</Match>
                <Match when="other">Vous avez {this.state.count} articles dans votre panier</Match>
            </Pluralize></span>; },
	"More": function() { return <span>Plus</span>; },
	"Less": function() { return <span>Moins</span>; }
};

