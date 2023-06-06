/**
 * Finds the roots of a parametric linear equation in `t`,
 * where `t` lies in the interval of `[0,1]`.
 */
function linearRoot(a, b) {
    var t = -b / a;
    return a !== 0 && t >= 0 && t <= 1 ? [t] : [];
}
/**
 * Finds the roots of a parametric quadratic equation in `t`,
 * where `t` lies in the interval of `[0,1]`.
 */
function quadraticRoots(a, b, c) {
    if (a === 0) {
        return linearRoot(b, c);
    }
    var D = b * b - 4 * a * c; // The polynomial's discriminant.
    var roots = [];
    if (D === 0) {
        // A single real root.
        var t = -b / (2 * a);
        if (t >= 0 && t <= 1) {
            roots.push(t);
        }
    }
    else if (D > 0) {
        // A pair of distinct real roots.
        var rD = Math.sqrt(D);
        var t1 = (-b - rD) / (2 * a);
        var t2 = (-b + rD) / (2 * a);
        if (t1 >= 0 && t1 <= 1) {
            roots.push(t1);
        }
        if (t2 >= 0 && t2 <= 1) {
            roots.push(t2);
        }
    }
    // else -> Complex roots.
    return roots;
}
/**
 * Finds the roots of a parametric cubic equation in `t`,
 * where `t` lies in the interval of `[0,1]`.
 * Returns an array of parametric intersection locations along the cubic,
 * excluding out-of-bounds intersections (before or after the end point
 * or in the imaginary plane).
 * An adaptation of http://www.particleincell.com/blog/2013/cubic-line-intersection/
 */
export function cubicRoots(a, b, c, d) {
    if (a === 0) {
        return quadraticRoots(b, c, d);
    }
    var A = b / a;
    var B = c / a;
    var C = d / a;
    var Q = (3 * B - A * A) / 9;
    var R = (9 * A * B - 27 * C - 2 * A * A * A) / 54;
    var D = Q * Q * Q + R * R; // The polynomial's discriminant.
    var third = 1 / 3;
    var roots = [];
    if (D >= 0) {
        // Complex or duplicate roots.
        var rD = Math.sqrt(D);
        var S = Math.sign(R + rD) * Math.pow(Math.abs(R + rD), third);
        var T = Math.sign(R - rD) * Math.pow(Math.abs(R - rD), third);
        var Im = Math.abs((Math.sqrt(3) * (S - T)) / 2); // Complex part of the root pair.
        var t = -third * A + (S + T); // A real root.
        if (t >= 0 && t <= 1) {
            roots.push(t);
        }
        if (Im === 0) {
            var t_1 = -third * A - (S + T) / 2; // The real part of a complex root.
            if (t_1 >= 0 && t_1 <= 1) {
                roots.push(t_1);
            }
        }
    }
    else {
        // Distinct real roots.
        var theta = Math.acos(R / Math.sqrt(-Q * Q * Q));
        var thirdA = third * A;
        var twoSqrtQ = 2 * Math.sqrt(-Q);
        var t1 = twoSqrtQ * Math.cos(third * theta) - thirdA;
        var t2 = twoSqrtQ * Math.cos(third * (theta + 2 * Math.PI)) - thirdA;
        var t3 = twoSqrtQ * Math.cos(third * (theta + 4 * Math.PI)) - thirdA;
        if (t1 >= 0 && t1 <= 1) {
            roots.push(t1);
        }
        if (t2 >= 0 && t2 <= 1) {
            roots.push(t2);
        }
        if (t3 >= 0 && t3 <= 1) {
            roots.push(t3);
        }
    }
    return roots;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seVJvb3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NjZW5lL3BvbHlSb290cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxTQUFTLFVBQVUsQ0FBQyxDQUFTLEVBQUUsQ0FBUztJQUNwQyxJQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2xELENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFTLGNBQWMsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVM7SUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ1QsT0FBTyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzNCO0lBRUQsSUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGlDQUFpQztJQUU5RCxJQUFNLEtBQUssR0FBYSxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ1Qsc0JBQXNCO1FBQ3RCLElBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakI7S0FDSjtTQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNkLGlDQUFpQztRQUNqQyxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMs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