"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assertInput = assertInput;
exports.assertUnique = assertUnique;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 *  Error type & handling, assertions
 */

var InputError = function (_Error) {
    _inherits(InputError, _Error);

    function InputError(description, node) {
        _classCallCheck(this, InputError);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InputError).call(this, description));

        Object.assign(_this, {
            description: description,
            node: node,
            inputError: true
        });
        return _this;
    }

    return InputError;
}(Error);

function assertInput(condition, description, node) {
    if (!condition) {
        throw new InputError(description, node);
    }
}

function assertUnique(map, description, node) {
    var dupes = Object.keys(map).filter(function (key) {
        return map[key] > 1;
    });
    assertInput(dupes.length === 0, description + ": " + dupes, node);
}

