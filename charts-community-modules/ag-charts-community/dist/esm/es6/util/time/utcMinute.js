import { CountableTimeInterval } from './interval';
import { durationMinute } from './duration';
function encode(date) {
    return Math.floor(date.getTime() / durationMinute);
}
function decode(encoded) {
    return new Date(encoded * durationMinute);
}
export const utcMinute = new CountableTimeInterval(encode, decode);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRjTWludXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWwvdGltZS91dGNNaW51dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFNUMsU0FBUyxNQUFNLENBQUMsSUFBVTtJQUN0QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLGNBQWMsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFFRCxTQUFTLE1BQU0sQ0FBQyxPQUFlO0lBQzNCLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMifQ==