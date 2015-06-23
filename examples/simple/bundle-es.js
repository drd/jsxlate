var React = require("react");
module.exports = {
	"Less": function() { return <span>Menos</span>; },
	"More": function() { return <span>Mas</span>; },
	"<Pluralize on={this.state.count}>\n                <Match when=\"=0\">You have no items in your cart</Match>\n                <Match when=\"one\">You have one item in your cart</Match>\n                <Match when=\"other\">You have {this.state.count} items in your cart</Match>\n            </Pluralize>": function(Pluralize, Match) { return <span>
    <Pluralize on={this.state.count}>
                <Match when="=0">No tiene nada en su carrito</Match>
                <Match when="one">Tiene un artículo en su carrito</Match>
                <Match when="other">Tiene {this.state.count} artículos en su carrito</Match>
            </Pluralize></span>; },
	"Hello, <Awesome /> world!": function(Awesome) { return <span>¡Hola, mundo <Awesome />!</span>; },
	"AWESOME": function() { return <span>IMPRESIONANTE</span>; },
	"Choose locale:": function() { return <span>Eligir lugar:</span>; },
	"Translated <span:hello>{thing}</span:hello> Application": function(thing) { return <span>Applicacíon <span className="hello">{thing}</span> traducido</span>; },
	"awesome?": function() { return '\xBFimpresionante?'; }
};

