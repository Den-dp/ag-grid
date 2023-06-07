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
import { Autowired, Bean, PostConstruct } from "@ag-grid-community/core";
import { BaseCreator } from "./baseCreator";
import { Downloader } from "./downloader";
import { CsvSerializingSession } from "./sessions/csvSerializingSession";
var CsvCreator = /** @class */ (function (_super) {
    __extends(CsvCreator, _super);
    function CsvCreator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CsvCreator.prototype.postConstruct = function () {
        this.setBeans({
            gridSerializer: this.gridSerializer,
            gridOptionsService: this.gridOptionsService
        });
    };
    CsvCreator.prototype.getMergedParams = function (params) {
        var baseParams = this.gridOptionsService.get('defaultCsvExportParams');
        return Object.assign({}, baseParams, params);
    };
    CsvCreator.prototype.export = function (userParams) {
        if (this.isExportSuppressed()) {
            console.warn("AG Grid: Export cancelled. Export is not allowed as per your configuration.");
            return '';
        }
        var mergedParams = this.getMergedParams(userParams);
        var data = this.getData(mergedParams);
        var packagedFile = new Blob(["\ufeff", data], { type: 'text/plain' });
        Downloader.download(this.getFileName(mergedParams.fileName), packagedFile);
        return data;
    };
    CsvCreator.prototype.exportDataAsCsv = function (params) {
        return this.export(params);
    };
    CsvCreator.prototype.getDataAsCsv = function (params, skipDefaultParams) {
        if (skipDefaultParams === void 0) { skipDefaultParams = false; }
        var mergedParams = skipDefaultParams
            ? Object.assign({}, params)
            : this.getMergedParams(params);
        return this.getData(mergedParams);
    };
    CsvCreator.prototype.getDefaultFileName = function () {
        return 'export.csv';
    };
    CsvCreator.prototype.getDefaultFileExtension = function () {
        return 'csv';
    };
    CsvCreator.prototype.createSerializingSession = function (params) {
        var _a = this, columnModel = _a.columnModel, valueService = _a.valueService, gridOptionsService = _a.gridOptionsService, valueFormatterService = _a.valueFormatterService, valueParserService = _a.valueParserService;
        var _b = params, processCellCallback = _b.processCellCallback, processHeaderCallback = _b.processHeaderCallback, processGroupHeaderCallback = _b.processGroupHeaderCallback, processRowGroupCallback = _b.processRowGroupCallback, suppressQuotes = _b.suppressQuotes, columnSeparator = _b.columnSeparator;
        return new CsvSerializingSession({
            columnModel: columnModel,
            valueService: valueService,
            gridOptionsService: gridOptionsService,
            valueFormatterService: valueFormatterService,
            valueParserService: valueParserService,
            processCellCallback: processCellCallback || undefined,
            processHeaderCallback: processHeaderCallback || undefined,
            processGroupHeaderCallback: processGroupHeaderCallback || undefined,
            processRowGroupCallback: processRowGroupCallback || undefined,
            suppressQuotes: suppressQuotes || false,
            columnSeparator: columnSeparator || ','
        });
    };
    CsvCreator.prototype.isExportSuppressed = function () {
        return this.gridOptionsService.is('suppressCsvExport');
    };
    __decorate([
        Autowired('columnModel')
    ], CsvCreator.prototype, "columnModel", void 0);
    __decorate([
        Autowired('valueService')
    ], CsvCreator.prototype, "valueService", void 0);
    __decorate([
        Autowired('gridSerializer')
    ], CsvCreator.prototype, "gridSerializer", void 0);
    __decorate([
        Autowired('gridOptionsService')
    ], CsvCreator.prototype, "gridOptionsService", void 0);
    __decorate([
        Autowired('valueFormatterService')
    ], CsvCreator.prototype, "valueFormatterService", void 0);
    __decorate([
        Autowired('valueParserService')
    ], CsvCreator.prototype, "valueParserService", void 0);
    __decorate([
        PostConstruct
    ], CsvCreator.prototype, "postConstruct", null);
    CsvCreator = __decorate([
        Bean('csvCreator')
    ], CsvCreator);
    return CsvCreator;
}(BaseCreator));
export { CsvCreator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3N2Q3JlYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jc3ZFeHBvcnQvY3N2Q3JlYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULElBQUksRUFNSixhQUFhLEVBSWhCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBR3pFO0lBQWdDLDhCQUFxRTtJQUFyRzs7SUF1RkEsQ0FBQztJQTdFVSxrQ0FBYSxHQUFwQjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDVixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDbkMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjtTQUM5QyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVMsb0NBQWUsR0FBekIsVUFBMEIsTUFBd0I7UUFDOUMsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3pFLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTSwyQkFBTSxHQUFiLFVBQWMsVUFBNEI7UUFDdEMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRTtZQUMzQixPQUFPLENBQUMsSUFBSSxDQUFDLDZFQUE2RSxDQUFDLENBQUM7WUFDNUYsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUVELElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEQsSUFBTSxJQUFJLEdBQUcsSUFB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