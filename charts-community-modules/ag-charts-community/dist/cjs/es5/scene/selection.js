"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selection = void 0;
var node_1 = require("./node");
var Selection = /** @class */ (function () {
    function Selection(parent, classOrFactory) {
        this._nodes = [];
        this._data = [];
        this._parent = parent;
        this._factory = Object.prototype.isPrototypeOf.call(node_1.Node, classOrFactory)
            ? function () { return new classOrFactory(); }
            : classOrFactory;
    }
    Selection.select = function (parent, classOrFactory) {
        return new Selection(parent, classOrFactory);
    };
    Selection.prototype.each = function (iterate) {
        this._nodes.forEach(function (node, i) { return iterate(node, node.datum, i); });
        return this;
    };
    Selection.prototype.update = function (data, init) {
        var _this = this;
        var old = this._data;
        var parent = this._parent;
        var factory = this._factory;
        if (data.length > old.length) {
            data.slice(old.length).forEach(function (datum) {
                var node = factory(datum);
                node.datum = datum;
                init === null || init === void 0 ? void 0 : init(node);
                parent.appendChild(node);
                _this._nodes.push(node);
            });
        }
        else if (data.length < old.length) {
            this._nodes.splice(data.length).forEach(function (node) {
                parent.removeChild(node);
            });
        }
        this._data = data.slice(0);
        for (var i = 0; i < data.length; i++) {
            this._nodes[i].datum = this._data[i];
        }
        return this;
    };
    Selection.prototype.clear = function () {
        this.update([]);
        return this;
    };
    Selection.selectAll = function (parent, predicate) {
        var results = [];
        var traverse = function (node) {
            if (predicate(node)) {
                results.push(node);
            }
            node.children.forEach(traverse);
        };
        traverse(parent);
        return results;
    };
    Selection.selectByClass = function (node, Class) {
        return Selection.selectAll(node, function (node) { return node instanceof Class; });
    };
    Selection.selectByTag = function (node, tag) {
        return Selection.selectAll(node, function (node) { return node.tag === tag; });
    };
    Selection.prototype.select = function (predicate) {
        return Selection.selectAll(this._parent, predicate);
    };
    Selection.prototype.selectByClass = function (Class) {
        return this.select(function (node) { return node instanceof Class; });
    };
    Selection.prototype.selectByTag = function (tag) {
        return this.select(function (node) { return node.tag === tag; });
    };
    Selection.prototype.nodes = function () {
        return this._nodes;
    };
    return Selection;
}());
exports.Selection = Selection;
