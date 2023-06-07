const group = (content) => `(${content})`;
const optionalGroup = (content) => `${group(content)}?`;
const nonCapturingGroup = (content) => optionalGroup(`?:${content}`);
const formatRegEx = (() => {
    const fill = '.';
    const align = '[<>=^]';
    const sign = '[+\\-( ]';
    const symbol = '[$€£¥₣₹#]';
    const zero = '0';
    const width = '\\d+';
    const comma = ',';
    const precision = '\\d+';
    const tilde = '~';
    const type = '[%a-z]';
    return new RegExp([
        '^',
        nonCapturingGroup(`${optionalGroup(fill)}${group(align)}`),
        optionalGroup(sign),
        optionalGroup(symbol),
        optionalGroup(zero),
        optionalGroup(width),
        optionalGroup(comma),
        nonCapturingGroup(`\\.${group(precision)}`),
        optionalGroup(tilde),
        optionalGroup(type),
        '$',
    ].join(''), 'i');
})();
const surroundedRegEx = (() => {
    const prefix = '.*?';
    const content = '.+?';
    const suffix = '.*?';
    return new RegExp(['^', group(prefix), `#\\{${group(content)}\\}`, group(suffix), '$'].join(''));
})();
function parseFormatter(formatter) {
    let prefix;
    let suffix;
    const surrounded = surroundedRegEx.exec(formatter);
    if (surrounded) {
        [, prefix, formatter, suffix] = surrounded;
    }
    const match = formatRegEx.exec(formatter);
    if (!match) {
        throw new Error(`The number formatter is invalid: ${formatter}`);
    }
    const [, fill, align, sign, symbol, zero, width, comma, precision, trim, type] = match;
    return {
        fill,
        align,
        sign,
        symbol,
        zero,
        width: parseInt(width),
        comma,
        precision: parseInt(precision),
        trim: Boolean(trim),
        type,
        prefix,
        suffix,
    };
}
export function format(formatter) {
    const options = typeof formatter === 'string' ? parseFormatter(formatter) : formatter;
    const { fill, align, sign = '-', symbol, zero, width, comma, type, prefix = '', suffix = '' } = options;
    let { precision, trim } = options;
    let formatBody;
    if (!type) {
        formatBody = decimalTypes['g'];
        trim = true;
    }
    else if (type in decimalTypes && type in integerTypes) {
        formatBody = isNaN(precision) ? integerTypes[type] : decimalTypes[type];
    }
    else if (type in decimalTypes) {
        formatBody = decimalTypes[type];
    }
    else if (type in integerTypes) {
        formatBody = integerTypes[type];
    }
    else {
        throw new Error(`The number formatter type is invalid: ${type}`);
    }
    if (isNaN(precision)) {
        precision = type ? 6 : 12;
    }
    return (n) => {
        let result = formatBody(n, precision);
        if (trim) {
            result = removeTrailingZeros(result);
        }
        if (comma) {
            result = insertSeparator(result, comma);
        }
        result = addSign(n, result, sign);
        if (symbol && symbol !== '#') {
            result = `${symbol}${result}`;
        }
        if (symbol === '#' && type === 'x') {
            result = `0x${result}`;
        }
        if (type === 's') {
            result = `${result}${getSIPrefix(n)}`;
        }
        if (type === '%' || type === 'p') {
            result = `${result}%`;
        }
        if (!isNaN(width)) {
            result = addPadding(result, width, fill !== null && fill !== void 0 ? fill : zero, align);
        }
        result = `${prefix}${result}${suffix}`;
        return result;
    };
}
const absFloor = (n) => Math.floor(Math.abs(n));
const integerTypes = {
    b: (n) => absFloor(n).toString(2),
    c: (n) => String.fromCharCode(n),
    d: (n) => Math.round(Math.abs(n)).toFixed(0),
    o: (n) => absFloor(n).toString(8),
    x: (n) => absFloor(n).toString(16),
    X: (n) => integerTypes.x(n).toUpperCase(),
    n: (n) => integerTypes.d(n),
    '%': (n) => `${absFloor(n * 100).toFixed(0)}`,
};
const decimalTypes = {
    e: (n, f) => Math.abs(n).toExponential(f),
    E: (n, f) => decimalTypes.e(n, f).toUpperCase(),
    f: (n, f) => Math.abs(n).toFixed(f),
    F: (n, f) => decimalTypes.f(n, f).toUpperCase(),
    g: (n, f) => {
        if (n === 0) {
            return '0';
        }
        const a = Math.abs(n);
        const p = Math.floor(Math.log10(a));
        if (p >= -4 && p < f) {
            return a.toFixed(f - 1 - p);
        }
        return a.toExponential(f - 1);
    },
    G: (n, f) => decimalTypes.g(n, f).toUpperCase(),
    n: (n, f) => decimalTypes.g(n, f),
    p: (n, f) => decimalTypes.r(n * 100, f),
    r: (n, f) => {
        if (n === 0) {
            return '0';
        }
        const a = Math.abs(n);
        const p = Math.floor(Math.log10(a));
        const q = p - (f - 1);
        if (q <= 0) {
            return a.toFixed(-q);
        }
        const x = Math.pow(10, q);
        return (Math.round(a / x) * x).toFixed();
    },
    s: (n, f) => {
        const p = getSIPrefixPower(n);
        return decimalTypes.r(n / Math.pow(10, p), f);
    },
    '%': (n, f) => decimalTypes.f(n * 100, f),
};
function removeTrailingZeros(numString) {
    return numString.replace(/\.0+$/, '').replace(/(\.[1-9])0+$/, '$1');
}
function insertSeparator(numString, separator) {
    let dotIndex = numString.indexOf('.');
    if (dotIndex < 0) {
        dotIndex = numString.length;
    }
    const integerChars = numString.substring(0, dotIndex).split('');
    const fractionalPart = numString.substring(dotIndex);
    for (let i = integerChars.length - 3; i > 0; i -= 3) {
        integerChars.splice(i, 0, separator);
    }
    return `${integerChars.join('')}${fractionalPart}`;
}
function getSIPrefix(n) {
    return siPrefixes[getSIPrefixPower(n)];
}
function getSIPrefixPower(n) {
    const power = Math.log10(Math.abs(n));
    const p = Math.floor(power / 3) * 3;
    return Math.max(minSIPrefix, Math.min(maxSIPrefix, p));
}
const minSIPrefix = -24;
const maxSIPrefix = 24;
const siPrefixes = {
    [minSIPrefix]: 'y',
    [-21]: 'z',
    [-18]: 'a',
    [-15]: 'f',
    [-12]: 'p',
    [-9]: 'n',
    [-6]: 'µ',
    [-3]: 'm',
    [0]: '',
    [3]: 'k',
    [6]: 'M',
    [9]: 'G',
    [12]: 'T',
    [15]: 'P',
    [18]: 'E',
    [21]: 'Z',
    [maxSIPrefix]: 'Y',
};
const minusSign = '\u2212';
function addSign(num, numString, signType = '') {
    if (signType === '(') {
        return num >= 0 ? numString : `(${numString})`;
    }
    const plusSign = signType === '+' ? '+' : '';
    return `${num >= 0 ? plusSign : minusSign}${numString}`;
}
function addPadding(numString, width, fill = ' ', align = '>') {
    let result = numString;
    if (align === '>' || !align) {
        result = result.padStart(width, fill);
    }
    else if (align === '<') {
        result = result.padEnd(width, fill);
    }
    else if (align === '^') {
        const padWidth = Math.max(0, width - result.length);
        const padLeft = Math.ceil(padWidth / 2);
        const padRight = Math.floor(padWidth / 2);
        result = result.padStart(padLeft + result.length, fill);
        result = result.padEnd(padRight + result.length, fill);
    }
    return result;
}
export function tickFormat(ticks, formatter) {
    const options = parseFormatter(formatter !== null && formatter !== void 0 ? formatter : ',f');
    if (isNaN(options.precision)) {
        if (options.type === 'f' || options.type === '%') {
            options.precision = Math.max(...ticks.map((x) => {
                if (typeof x !== 'number' || x === 0) {
                    return 0;
                }
                const l = Math.floor(Math.log10(Math.abs(x)));
                const digits = options.type ? 6 : 12;
                const exp = x.toExponential(digits - 1).replace(/\.?0+e/, 'e');
                const dotIndex = exp.indexOf('.');
                if (dotIndex < 0) {
                    return l >= 0 ? 0 : -l;
                }
                const s = exp.indexOf('e') - dotIndex;
                return Math.max(0, s - l - 1);
            }));
        }
        else if (!options.type || options.type in decimalTypes) {
            options.precision = Math.max(...ticks.map((x) => {
                if (typeof x !== 'number') {
                    return 0;
                }
                const exp = x.toExponential((options.type ? 6 : 12) - 1).replace(/\.?0+e/, 'e');
                return exp.substring(0, exp.indexOf('e')).replace('.', '').length;
            }));
        }
    }
    const f = format(options);
    return (n) => f(Number(n));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyRm9ybWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWwvbnVtYmVyRm9ybWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWVBLE1BQU0sS0FBSyxHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FBQyxJQUFJLE9BQU8sR0FBRyxDQUFDO0FBQ2xELE1BQU0sYUFBYSxHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBQ2hFLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxPQUFlLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFFN0UsTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFHLEVBQUU7SUFDdEIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQztJQUN2QixNQUFNLElBQUksR0FBRyxVQUFVLENBQUM7SUFDeEIsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDO0lBQzNCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNqQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUM7SUFDckIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQ2xCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQztJQUN6QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDbEIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDO0lBRXRCLE9BQU8sSUFBSSxNQUFNLENBQ2I7UUFDSSxHQUFHO1FBQ0gsaUJBQWlCLENBQUMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDMUQsYUFBYSxDQUFDLElBQUksQ0FBQztRQUNuQixhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ3JCLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDbkIs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LENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztJQUNsQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFO0lBQ3pDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0IsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO0NBQ2hELENBQUM7QUFFRixNQUFNLFlBQVksR0FBcUQ7SUFDbkUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRTtJQUMvQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFO0lBQy9DLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNSLElBQUksQ0FB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RUFBRSxHQUFHO0lBQ2xCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHO0lBQ1YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUc7SUFDVixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRztJQUNWLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHO0lBQ1YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUc7SUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRztJQUNULENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHO0lBQ1QsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ1AsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHO0lBQ1IsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHO0lBQ1IsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHO0lBQ1IsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHO0lBQ1QsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHO0lBQ1QsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHO0lBQ1QsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHO0lBQ1QsQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHO0NBQ3JCLENBQUM7QUFFRixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUM7QUFFM0IsU0FBUyxPQUFPLENBQUMsR0FBVyxFQUFFLFNBQWlCLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDMUQsSUFBSSxRQUFRLEtBQUssR0FBRyxFQUFFO1FBQ2xCLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsR0FBRyxDQUFDO0tBQ2xEO0lBQ0QsTUFBTSxRQUFRLEdBQUcsUUFBUSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDN0MsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLFNB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