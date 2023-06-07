import interpolate from '../interpolate/value';
function createEase(fn) {
    return function (_a) {
        var from = _a.from, to = _a.to;
        var interp = interpolate(from, to);
        return function (time) { return interp(fn(time)); };
    };
}
export function linear(_a) {
    var from = _a.from, to = _a.to;
    return interpolate(from, to);
}
// https://easings.net/
export var easeIn = createEase(function (x) { return 1 - Math.cos((x * Math.PI) / 2); });
export var easeOut = createEase(function (x) { return Math.sin((x * Math.PI) / 2); });
export var easeInOut = createEase(function (x) { return -(Math.cos(x * Math.PI) - 1) / 2; });
export var easeOutElastic = createEase(function (x) {
    if (x === 0 || x === 1)
        return x;
    var scale = Math.pow(2, -10 * x);
    var position = x * 10 - 0.75;
    var arc = (2 * Math.PI) / 3;
    return scale * Math.sin(position * arc) + 1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFzaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vdGlvbi9lYXNpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXLE1BQU0sc0JBQXNCLENBQUM7QUFTL0MsU0FBUyxVQUFVLENBQUksRUFBeUI7SUFDNUMsT0FBTyxVQUFDLEVBQVk7WUFBVixJQUFJLFVBQUEsRUFBRSxFQUFFLFFBQUE7UUFDZCxJQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sVUFBQyxJQUFZLElBQUssT0FBQSxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQWhCLENBQWdCLENBQUM7SUFDOUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVELE1BQU0sVUFBVSxNQUFNLENBQUksRUFBMkI7UUFBekIsSUFBSSxVQUFBLEVBQUUsRUFBRSxRQUFBO0lBQ2hDLE9BQU8sV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRUQsdUJBQXVCO0FBQ3ZCLE1BQU0sQ0FBQyxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQU0sVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQztBQUM5RSxNQUFNLENBQUMsSUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFNLFVBQUMsQ0FBQyxJQUFLLE9BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQztBQUMzRSxNQUFNLENBQUMsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFNLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQztBQUNsRixNQUFNLENBQUMsSUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFNLFVBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFBRSxPQUFPLENBQUMsQ0FBQztJQUVqQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuQyxJQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztJQUMvQixJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTlCLE9BQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoRCxDQUFDLENBQUMsQ0FBQyJ9