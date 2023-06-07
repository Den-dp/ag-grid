import { CountableTimeInterval } from './interval';
import { durationSecond, durationMinute } from './duration';
var offset = new Date().getTimezoneOffset() * durationMinute;
function encode(date) {
    return Math.floor((date.getTime() - offset) / durationSecond);
}
function decode(encoded) {
    return new Date(offset + encoded * durationSecond);
}
export var second = new CountableTimeInterval(encode, decode);
export default second;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vjb25kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWwvdGltZS9zZWNvbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTVELElBQU0sTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxjQUFjLENBQUM7QUFFL0QsU0FBUyxNQUFNLENBQUMsSUFBVTtJQUN0QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUM7QUFDbEUsQ0FBQztBQUVELFNBQVMsTUFBTSxDQUFDLE9BQWU7SUFDM0IsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxHQUFHLGNBQWMsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFFRCxNQUFNLENBQUMsSUFBTSxNQUFNLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDaEUsZUFBZSxNQUFNLENBQUMifQ==