var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { AxisTitle } from '../axis';
import { Caption } from '../caption';
import { DropShadow } from '../scene/dropShadow';
import { CrossLine } from './crossline/crossLine';
import { DoughnutInnerLabel, DoughnutInnerCircle } from './series/polar/pieSeries';
export var JSON_APPLY_PLUGINS = {
    constructors: {},
};
var JSON_APPLY_OPTIONS = {
    constructors: {
        title: Caption,
        subtitle: Caption,
        footnote: Caption,
        shadow: DropShadow,
        innerCircle: DoughnutInnerCircle,
        'axes[].crossLines[]': CrossLine,
        'axes[].title': AxisTitle,
        'series[].innerLabels[]': DoughnutInnerLabel,
    },
    allowedTypes: {
        'legend.pagination.marker.shape': ['primitive', 'function'],
        'series[].marker.shape': ['primitive', 'function'],
        'axis[].tick.count': ['primitive', 'class-instance'],
    },
};
export function getJsonApplyOptions() {
    return {
        constructors: __assign(__assign({}, JSON_APPLY_OPTIONS.constructors), JSON_APPLY_PLUGINS.constructors),
        allowedTypes: __assign({}, JSON_APPLY_OPTIONS.allowedTypes),
    };
}
