export function getLineDash(lineCap, lineDash) {
    if (lineDash === void 0) { lineDash = 'solid'; }
    var buttOrNull = {
        solid: [],
        dash: [4, 3],
        dot: [1, 3],
        dashDot: [4, 3, 1, 3],
        dashDotDot: [4, 3, 1, 3, 1, 3],
        shortDot: [1, 1],
        shortDash: [3, 1],
        shortDashDot: [3, 1, 1, 1],
        shortDashDotDot: [3, 1, 1, 1, 1, 1],
        longDash: [8, 3],
        longDashDot: [8, 3, 1, 3],
        longDashDotDot: [8, 3, 1, 3, 1, 3]
    };
    var roundOrSquare = {
        solid: [],
        dash: [3, 3],
        dot: [0, 3],
        dashDot: [3, 3, 0, 3],
        dashDotDot: [3, 3, 0, 3, 0, 3],
        shortDot: [0, 2],
        shortDash: [2, 2],
        shortDashDot: [2, 2, 0, 2],
        shortDashDotDot: [2, 2, 0, 2, 0, 2],
        longDash: [7, 3],
        longDashDot: [7, 3, 0, 3],
        longDashDotDot: [7, 3, 0, 3, 0, 3]
    };
    if (lineCap === 'round' || lineCap === 'square') {
        if (roundOrSquare[lineDash] == undefined) {
            console.warn("'" + lineDash + "' is not a valid 'lineDash' option.");
            return roundOrSquare.solid;
        }
        return roundOrSquare[lineDash];
    }
    if (buttOrNull[lineDash] == undefined) {
        console.warn("'" + lineDash + "' is not a valid 'lineDash' option.");
        return buttOrNull.solid;
    }
    return buttOrNull[lineDash];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZURhc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbC9saW5lRGFzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFVBQVUsV0FBVyxDQUFDLE9BQWdELEVBQUUsUUFBMEI7SUFBMUIseUJBQUEsRUFBQSxrQkFBMEI7SUFFcEcsSUFBTSxVQUFVLEdBQWdDO1FBQzVDLEtBQUssRUFBRSxFQUFFO1FBQ1QsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNaLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDWCxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckIsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUIsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQixlQUFlLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QixjQUFjLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNyQyxDQUFDO0lBRUYsSUFBTSxhQUFhLEdBQWdDO1FBQy9DLEtBQUssRUFBRSxFQUFFO1FBQ1QsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNaLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDWCxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckIsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUIsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQixlQUFlLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QixjQUFjLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNyQyxDQUFDO0lBRUYsSUFBSSxPQUFPLEtBQUssT0FBTyxJQUFJLE9BQU8sS0FBSyxRQUFRLEVBQUU7UUFDN0MsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxFQUFFO1lBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBSSxRQUFRLHdDQUFxQyxDQUFDLENBQUM7WUFDaEUsT0FBTyxhQUFhLENBQUMsS0FBSyxDQUFDO1NBQzlCO1FBRUQsT0FBTyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDbEM7SUFFRCxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLEVBQUU7UUFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFJLFFBQVEsd0NBQXFDLENBQUMsQ0FBQztRQUNoRSxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUM7S0FDM0I7SUFFRCxPQUFPLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoQyxDQUFDIn0=