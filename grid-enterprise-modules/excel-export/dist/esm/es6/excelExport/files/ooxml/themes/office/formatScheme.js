const getPropertyVal = (name, val, children) => ({
    name: `a:${name}`,
    properties: {
        rawMap: {
            val
        }
    },
    children
});
const getGs = (props) => {
    const [pos, schemeColor, satMod, lumMod, tint, shade] = props;
    const children = [];
    children.push(getPropertyVal('satMod', satMod));
    if (lumMod) {
        children.push(getPropertyVal('lumMod', lumMod));
    }
    if (tint) {
        children.push(getPropertyVal('tint', tint));
    }
    if (shade) {
        children.push(getPropertyVal('shade', shade));
    }
    return {
        name: 'a:gs',
        properties: {
            rawMap: {
                pos
            }
        },
        children: [{
                name: 'a:schemeClr',
                properties: {
                    rawMap: {
                        val: schemeColor
                    }
                },
                children
            }]
    };
};
const getSolidFill = (val, children) => ({
    name: 'a:solidFill',
    children: [getPropertyVal('schemeClr', val, children)]
});
const getGradFill = (props) => {
    const [rotWithShape, gs1, gs2, gs3, lin] = props;
    const [ang, scaled] = lin;
    return {
        name: 'a:gradFill',
        properties: {
            rawMap: {
                rotWithShape
            }
        },
        children: [{
                name: 'a:gsLst',
                children: [
                    getGs(gs1),
                    getGs(gs2),
                    getGs(gs3)
                ]
            }, {
                name: 'a:lin',
                properties: {
                    rawMap: {
                        ang: ang,
                        scaled: scaled
                    }
                }
            }]
    };
};
const getLine = (props) => {
    const [w, cap, cmpd, algn] = props;
    return {
        name: 'a:ln',
        properties: {
            rawMap: { w, cap, cmpd, algn }
        },
        children: [
            getSolidFill('phClr'),
            getPropertyVal('prstDash', 'solid'),
            {
                name: 'a:miter',
                properties: {
                    rawMap: {
                        lim: '800000'
                    }
                }
            }
        ]
    };
};
const getEffectStyle = (shadow) => {
    const children = [];
    if (shadow) {
        const [blurRad, dist, dir, algn, rotWithShape] = shadow;
        children.push({
            name: 'a:outerShdw',
            properties: {
                rawMap: { blurRad, dist, dir, algn, rotWithShape }
            },
            children: [
                getPropertyVal('srgbClr', '000000', [getPropertyVal('alpha', '63000')])
            ]
        });
    }
    return {
        name: 'a:effectStyle',
        children: [Object.assign({}, {
                name: 'a:effectLst'
            }, children.length ? { children } : {})]
    };
};
const getFillStyleList = () => ({
    name: 'a:fillStyleLst',
    children: [
        getSolidFill('phClr'),
        getGradFill([
            '1',
            ['0', 'phClr', '105000', '110000', '67000'],
            ['50000', 'phClr', '103000', '105000', '73000'],
            ['100000', 'phClr', '109000', '105000', '81000'],
            ['5400000', '0']
        ]),
        getGradFill([
            '1',
            ['0', 'phClr', '103000', '102000', '94000'],
            ['50000', 'phClr', '110000', '100000', undefined, '100000'],
            ['100000', 'phClr', '120000', '99000', undefined, '78000'],
            ['5400000', '0']
        ])
    ]
});
const getLineStyleList = () => ({
    name: 'a:lnStyleLst',
    children: [
        getLine(['6350', 'flat', 'sng', 'ctr']),
        getLine(['12700', 'flat', 'sng', 'ctr']),
        getLine(['19050', 'flat', 'sng', 'ctr'])
    ]
});
const getEffectStyleList = () => ({
    name: 'a:effectStyleLst',
    children: [
        getEffectStyle(),
        getEffectStyle(),
        getEffectStyle(['57150', '19050', '5400000', 'ctr', '0'])
    ]
});
const getBgFillStyleList = () => ({
    name: 'a:bgFillStyleLst',
    children: [
        getSolidFill('phClr'),
        getSolidFill('phClr', [
            getPropertyVal('tint', '95000'),
            getPropertyVal('satMod', '170000'),
        ]),
        getGradFill([
            '1',
            ['0', 'phClr', '150000', '102000', '93000', '98000'],
            ['50000', 'phClr', '130000', '103000', '98000', '90000'],
            ['100000', 'phClr', '120000', undefined, undefined, '63000'],
            ['5400000', '0']
        ])
    ]
});
const formatScheme = {
    getTemplate() {
        return {
            name: "a:fmtScheme",
            properties: {
                rawMap: {
                    name: "Office"
                }
            },
            children: [
                getFillStyleList(),
                getLineStyleList(),
                getEffectStyleList(),
                getBgFillStyleList()
            ]
        };
    }
};
export default formatScheme;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0U2NoZW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2V4Y2VsRXhwb3J0L2ZpbGVzL29veG1sL3RoZW1lcy9vZmZpY2UvZm9ybWF0U2NoZW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE1BQU0sY0FBYyxHQUFHLENBQUMsSUFBWSxFQUFFLEdBQVcsRUFBRSxRQUF1QixFQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQ3hGLElBQUksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNqQixVQUFVLEVBQUU7UUFDUixNQUFNLEVBQUU7WUFDSixHQUFHO1NBQ047S0FDSjtJQUNELFFBQVE7Q0FDWCxDQUFDLENBQUM7QUFFSCxNQUFNLEtBQUssR0FBRyxDQUFDLEtBQWEsRUFBYyxFQUFFO0lBQ3hDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUM5RCxNQUFNLFFBQVEsR0FBaUIsRUFBRSxDQUFDO0lBRWxDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2hELElBQUksTUFBTSxFQUFFO1FBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FBRTtJQUNoRSxJQUFJLElBQUksRUFBRTtRQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQUU7SUFDMUQsSUFBSSxLQUFLLEVBQUU7UUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUFFO0lBRTdELE9BQU87UUFDSCxJQUFJLEVBQUUsTUFBTTtRQUNaLFVBQVUsRUFBRTtZ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