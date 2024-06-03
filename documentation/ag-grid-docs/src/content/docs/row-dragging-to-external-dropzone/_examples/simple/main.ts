import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowDropZoneParams, createGrid } from '@ag-grid-community/core';
import { CommunityFeaturesModule, ModuleRegistry } from '@ag-grid-community/core';

ModuleRegistry.registerModules([CommunityFeaturesModule, ClientSideRowModelModule]);

var rowIdSequence = 100;

const columnDefs: ColDef[] = [
    { field: 'id', rowDrag: true },
    { field: 'color' },
    { field: 'value1' },
    { field: 'value2' },
];

let gridApi: GridApi;

const gridOptions: GridOptions = {
    defaultColDef: {
        filter: true,
        flex: 1,
    },
    rowClassRules: {
        'red-row': 'data.color == "Red"',
        'green-row': 'data.color == "Green"',
        'blue-row': 'data.color == "Blue"',
    },
    rowData: createRowData(),
    rowDragManaged: true,
    columnDefs: columnDefs,
    onGridReady: (params) => {
        addDropZones(params);
        addCheckboxListener(params);
    },
};

function addCheckboxListener(params: GridReadyEvent) {
    var checkbox = document.querySelector('input[type=checkbox]')! as any;

    checkbox.addEventListener('change', () => {
        params.api.setGridOption('suppressMoveWhenRowDragging', checkbox.checked);
    });
}

function createRowData() {
    var data: any[] = [];
    ['Red', 'Green', 'Blue', 'Red', 'Green', 'Blue', 'Red', 'Green', 'Blue'].forEach((color) => {
        var newDataItem = {
            id: rowIdSequence++,
            color: color,
            value1: Math.floor(Math.random() * 100),
            value2: Math.floor(Math.random() * 100),
        };
        data.push(newDataItem);
    });
    return data;
}

function createTile(data: any) {
    var el = document.createElement('div');

    el.classList.add('tile');
    el.classList.add(data.color.toLowerCase());
    el.innerHTML =
        '<div class="id">' +
        data.id +
        '</div>' +
        '<div class="value">' +
        data.value1 +
        '</div>' +
        '<div class="value">' +
        data.value2 +
        '</div>';

    return el;
}

function addDropZones(params: GridReadyEvent) {
    var tileContainer = document.querySelector('.tile-container') as any;
    var dropZone: RowDropZoneParams = {
        getContainer: () => {
            return tileContainer as any;
        },
        onDragStop: (params) => {
            var tile = createTile(params.node.data);
            tileContainer.appendChild(tile);
        },
    };

    params.api.addRowDropZone(dropZone);
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;

    gridApi = createGrid(gridDiv, gridOptions);
});
