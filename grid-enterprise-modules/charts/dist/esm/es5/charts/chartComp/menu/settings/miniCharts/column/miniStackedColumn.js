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
import { MiniChartWithAxes } from "../miniChartWithAxes";
import { createColumnRects } from "../miniChartHelpers";
var MiniStackedColumn = /** @class */ (function (_super) {
    __extends(MiniStackedColumn, _super);
    function MiniStackedColumn(container, fills, strokes, data, yScaleDomain, tooltipName) {
        if (data === void 0) { data = MiniStackedColumn.data; }
        if (yScaleDomain === void 0) { yScaleDomain = [0, 16]; }
        if (tooltipName === void 0) { tooltipName = "stackedColumnTooltip"; }
        var _this = _super.call(this, container, tooltipName) || this;
        var _a = _this, root = _a.root, size = _a.size, padding = _a.padding;
        _this.stackedColumns = createColumnRects({
            stacked: true,
            root: root,
            data: data,
            size: size,
            padding: padding,
            xScaleDomain: [0, 1, 2],
            yScaleDomain: yScaleDomain,
            xScalePadding: 0.3,
        });
        root.append([].concat.apply([], _this.stackedColumns));
        _this.updateColors(fills, strokes);
        return _this;
    }
    MiniStackedColumn.prototype.updateColors = function (fills, strokes) {
        this.stackedColumns.forEach(function (series, i) {
            return series.forEach(function (column) {
                column.fill = fills[i];
                column.stroke = strokes[i];
            });
        });
    };
    MiniStackedColumn.chartType = 'stackedColumn';
    MiniStackedColumn.data = [
        [8, 12, 16],
        [6, 9, 12],
        [2, 3, 4]
    ];
    return MiniStackedColumn;
}(MiniChartWithAxes));
export { MiniStackedColumn };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaVN0YWNrZWRDb2x1bW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY2hhcnRzL2NoYXJ0Q29tcC9tZW51L3NldHRpbmdzL21pbmlDaGFydHMvY29sdW1uL21pbmlTdGFja2VkQ29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3pELE9BQU8sRUFBRSxpQkFBaUIsRUFBMkIsTUFBTSxxQkFBcUIsQ0FBQztBQUVqRjtJQUF1QyxxQ0FBaUI7SUFXcEQsMkJBQ0ksU0FBc0IsRUFDdEIsS0FBZSxFQUNmLE9BQWlCLEVBQ2pCLElBQTZCLEVBQzdCLFlBQXNCLEVBQ3RCLFdBQW9DO1FBRnBDLHFCQUFBLEVBQUEsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJO1FBQzdCLDZCQUFBLEVBQUEsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDdEIsNEJBQUEsRUFBQSxvQ0FBb0M7UUFOeEMsWUFPSSxrQkFBTSxTQUFTLEVBQUUsV0FBVyxDQUFDLFNBa0JoQztRQWhCUyxJQUFBLEtBQTBCLEtBQUksRUFBNUIsSUFBSSxVQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsT0FBTyxhQUFTLENBQUM7UUFFckMsS0FBSSxDQUFDLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQztZQUNwQyxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksTUFBQTtZQUNKLElBQUksTUFBQTtZQUNKLElBQUksTUFBQTtZQUNKLE9BQU8sU0FBQTtZQUNQLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZCLFlBQVksY0FBQTtZQUNaLGFBQWEsRUFBRSxHQUFHO1NBQ00sQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxNQUFNLENBQUUsRUFBbUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUV4RSxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQzs7SUFDdEMsQ0FBQztJQUVELHdDQUFZLEdBQVosVUFBYSxLQUFlLEVBQUUsT0FBaUI7UUFDM0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFxQixFQUFFLENBQVM7WUFDekQsT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtnQkFDakIsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLENBQUMsQ0FBQztRQUhGLENBR0UsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQTVDTSwyQkFBUyxHQUFjLGVBQWUsQ0FBQztJQUl2QyxzQkFBSSxHQUFHO1FBQ1YsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDVixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ1osQ0FBQztJQXFDTix3QkFBQztDQUFBLEFBOUNELENBQXVDLGlCQUFpQixHQThDdkQ7U0E5Q1ksaUJBQWlCIn0=