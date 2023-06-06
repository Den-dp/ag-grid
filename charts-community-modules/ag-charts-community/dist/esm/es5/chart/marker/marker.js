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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { Path, ScenePathChangeDetection } from '../../scene/shape/path';
import { BBox } from '../../scene/bbox';
var Marker = /** @class */ (function (_super) {
    __extends(Marker, _super);
    function Marker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = 0;
        _this.y = 0;
        _this.size = 12;
        return _this;
    }
    Marker.prototype.computeBBox = function () {
        var _a = this, x = _a.x, y = _a.y, size = _a.size;
        var half = size / 2;
        return new BBox(x - half, y - half, size, size);
    };
    Marker.prototype.applyPath = function (s, moves) {
        var e_1, _a;
        var path = this.path;
        var _b = this, x = _b.x, y = _b.y;
        path.clear();
        try {
            for (var moves_1 = __values(moves), moves_1_1 = moves_1.next(); !moves_1_1.done; moves_1_1 = moves_1.next()) {
                var _c = moves_1_1.value, mx = _c.x, my = _c.y, t = _c.t;
                x += mx * s;
                y += my * s;
                if (t === 'move') {
                    path.moveTo(x, y);
                }
                else {
                    path.lineTo(x, y);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (moves_1_1 && !moves_1_1.done && (_a = moves_1.return)) _a.call(moves_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        path.closePath();
    };
    __decorate([
        ScenePathChangeDetection()
    ], Marker.prototype, "x", void 0);
    __decorate([
        ScenePathChangeDetection()
    ], Marker.prototype, "y", void 0);
    __decorate([
        ScenePathChangeDetection({ convertor: Math.abs })
    ], Marker.prototype, "size", void 0);
    return Marker;
}(Path));
export { Marker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NoYXJ0L21hcmtlci9tYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBSXhDO0lBQXFDLDBCQUFJO0lBQXpDO1FBQUEscUVBaUNDO1FBL0JHLE9BQUMsR0FBVyxDQUFDLENBQUM7UUFHZCxPQUFDLEdBQVcsQ0FBQyxDQUFDO1FBR2QsVUFBSSxHQUFXLEVBQUUsQ0FBQzs7SUF5QnRCLENBQUM7SUF2QkcsNEJBQVcsR0FBWDtRQUNVLElBQUEsS0FBaUIsSUFBSSxFQUFuQixDQUFDLE9BQUEsRUFBRSxDQUFDLE9BQUEsRUFBRSxJQUFJLFVBQVMsQ0FBQztRQUM1QixJQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRXRCLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRVMsMEJBQVMsR0FBbkIsVUFBb0IsQ0FBUyxFQUFFLEtBQXVCOztRQUMxQyxJQUFBLElBQUksR0FBSyxJQUFJLEtBQVQsQ0FBVTtRQUNsQixJQUFBLEtBQVcsSUFBSSxFQUFiLENBQUMsT0FBQSxFQUFFLENBQUMsT0FBUyxDQUFDO1FBRXBCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7WUFDYixLQUFrQyxJQUFBLFVBQUEsU0FBQSxLQUFLLENBQUEsNEJBQUEsK0NBQUU7Z0JBQTlCLElBQUEsb0JBQW1CLEVBQWQsRUFBRSxPQUFBLEVBQUssRUFBRSxPQUFBLEVBQUUsQ0FBQyxPQUFBO2dCQUN4QixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDWixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDWixJQUFJLENBQUMsS0FBSyxNQUFNLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ3JCO3FCQUFNO29CQUNILElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNyQjthQUNKOzs7Ozs7Ozs7UUFDRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQTlCRDtRQURDLHdCQUF3QixFQUFFO3FDQUNiO0lBR2Q7UUFEQyx3QkFBd0IsRUFBRTtxQ0FDYjtJQUdkO1FBREMsd0JBQXdCLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO3dDQUNoQztJQXlCdEIsYUFBQztDQUFBLEFBakNELENBQXFDLElBQUksR0FpQ3hDO1NBakNxQixNQUFNIn0=