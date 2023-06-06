var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Path } from '../../scene/shape/path';
import { BBox } from '../../scene/bbox';
import { LINE_CAP, NUMBER, COLOR_STRING, Validate } from '../../util/validation';
var RangeMask = /** @class */ (function (_super) {
    __extends(RangeMask, _super);
    function RangeMask() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._stroke = '#999999';
        _this._strokeWidth = 1;
        _this._fill = '#999999';
        _this._fillOpacity = 0.2;
        _this._lineCap = 'square';
        _this._x = 0;
        _this._y = 0;
        _this._width = 200;
        _this._height = 30;
        _this.minRange = 0.05;
        _this._min = 0;
        _this._max = 1;
        return _this;
    }
    Object.defineProperty(RangeMask.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            if (this._x !== value) {
                this._x = value;
                this.dirtyPath = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RangeMask.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            if (this._y !== value) {
                this._y = value;
                this.dirtyPath = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RangeMask.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            if (this._width !== value) {
                this._width = value;
                this.dirtyPath = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RangeMask.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            if (this._height !== value) {
                this._height = value;
                this.dirtyPath = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RangeMask.prototype, "min", {
        get: function () {
            return this._min;
        },
        set: function (value) {
            var _a;
            value = Math.min(Math.max(value, 0), this.max - this.minRange);
            if (isNaN(value)) {
                return;
            }
            if (this._min !== value) {
                this._min = value;
                this.dirtyPath = true;
                (_a = this.onRangeChange) === null || _a === void 0 ? void 0 : _a.call(this);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RangeMask.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (value) {
            var _a;
            value = Math.max(Math.min(value, 1), this.min + this.minRange);
            if (isNaN(value)) {
                return;
            }
            if (this._max !== value) {
                this._max = value;
                this.dirtyPath = true;
                (_a = this.onRangeChange) === null || _a === void 0 ? void 0 : _a.call(this);
            }
        },
        enumerable: false,
        configurable: true
    });
    RangeMask.prototype.computeBBox = function () {
        var _a = this, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        return new BBox(x, y, width, height);
    };
    RangeMask.prototype.computeVisibleRangeBBox = function () {
        var _a = this, x = _a.x, y = _a.y, width = _a.width, height = _a.height, min = _a.min, max = _a.max;
        var minX = x + width * min;
        var maxX = x + width * max;
        return new BBox(minX, y, maxX - minX, height);
    };
    RangeMask.prototype.updatePath = function () {
        var _a = this, path = _a.path, x = _a.x, y = _a.y, width = _a.width, height = _a.height, min = _a.min, max = _a.max;
        path.clear();
        var ax = this.align(x);
        var ay = this.align(y);
        var axw = ax + this.align(x, width);
        var ayh = ay + this.align(y, height);
        // Whole range.
        path.moveTo(ax, ay);
        path.lineTo(axw, ay);
        path.lineTo(axw, ayh);
        path.lineTo(ax, ayh);
        path.lineTo(ax, ay);
        var minX = this.align(x + width * min);
        var maxX = this.align(x + width * max);
        // Visible range.
        path.moveTo(minX, ay);
        path.lineTo(minX, ayh);
        path.lineTo(maxX, ayh);
        path.lineTo(maxX, ay);
        path.lineTo(minX, ay);
    };
    RangeMask.className = 'RangeMask';
    __decorate([
        Validate(COLOR_STRING)
    ], RangeMask.prototype, "_stroke", void 0);
    __decorate([
        Validate(NUMBER(0))
    ], RangeMask.prototype, "_strokeWidth", void 0);
    __decorate([
        Validate(COLOR_STRING)
    ], RangeMask.prototype, "_fill", void 0);
    __decorate([
        Validate(NUMBER(0, 1))
    ], RangeMask.prototype, "_fillOpacity", void 0);
    __decorate([
        Validate(LINE_CAP)
    ], RangeMask.prototype, "_lineCap", void 0);
    __decorate([
        Validate(NUMBER(0))
    ], RangeMask.prototype, "_width", void 0);
    __decorate([
        Validate(NUMBER(0))
    ], RangeMask.prototype, "_height", void 0);
    __decorate([
        Validate(NUMBER())
    ], RangeMask.prototype, "_min", void 0);
    __decorate([
        Validate(NUMBER())
    ], RangeMask.prototype, "_max", void 0);
    return RangeMask;
}(Path));
export { RangeMask };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2VNYXNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NoYXJ0L3NoYXBlcy9yYW5nZU1hc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFakY7SUFBK0IsNkJBQUk7SUFBbkM7UUFBQSxxRUE0SUM7UUF4SWEsYUFBTyxHQUFHLFNBQVMsQ0FBQztRQUdwQixrQkFBWSxHQUFHLENBQUMsQ0FBQztRQUdqQixXQUFLLEdBQUcsU0FBUyxDQUFDO1FBR2xCLGtCQUFZLEdBQUcsR0FBRyxDQUFDO1FBR25CLGNBQVEsR0FBaUIsUUFBUSxDQUFDO1FBRWxDLFFBQUUsR0FBVyxDQUFDLENBQUM7UUFXZixRQUFFLEdBQVcsQ0FBQyxDQUFDO1FBWWYsWUFBTSxHQUFXLEdBQUcsQ0FBQztRQVlyQixhQUFPLEdBQVcsRUFBRSxDQUFDO1FBVy9CLGNBQVEsR0FBRyxJQUFJLENBQUM7UUFHTixVQUFJLEdBQVcsQ0FBQyxDQUFDO1FBaUJqQixVQUFJLEdBQVcsQ0FBQyxDQUFDOztJQXdEL0IsQ0FBQztJQXpIRyxzQkFBSSx3QkFBQzthQU1MO1lBQ0ksT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ25CLENBQUM7YUFSRCxVQUFNLEtBQWE7WUFDZixJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssS0FBSyxFQUFFO2dCQUNuQixJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7YUFDekI7UUFDTCxDQUFDOzs7T0FBQTtJQU1ELHNCQUFJ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