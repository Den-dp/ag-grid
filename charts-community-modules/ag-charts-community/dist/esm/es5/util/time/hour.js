import { CountableTimeInterval } from './interval';
import { durationHour, durationMinute } from './duration';
var offset = new Date().getTimezoneOffset() * durationMinute;
function encode(date) {
    return Math.floor((date.getTime() - offset) / durationHour);
}
function decode(encoded) {
    return new Date(offset + encoded * durationHour);
}
export var hour = new CountableTimeInterval(encode, decode);
export default hour;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG91ci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91dGlsL3RpbWUvaG91ci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFMUQsSUFBTSxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLGNBQWMsQ0FBQztBQUUvRCxTQUFTLE1BQU0sQ0FBQyxJQUFVO0lBQ3RCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQztBQUNoRSxDQUFDO0FBRUQsU0FBUyxNQUFNLENBQUMsT0FBZTtJQUMzQixPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLEdBQUcsWUFBWSxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUVELE1BQU0sQ0FBQyxJQUFNLElBQUksR0FBRyxJQUFJLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM5RCxlQUFlLElBQUksQ0FBQyJ9