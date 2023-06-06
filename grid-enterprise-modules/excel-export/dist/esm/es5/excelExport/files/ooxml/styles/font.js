var fontFactory = {
    getTemplate: function (font) {
        var size = font.size, colorTheme = font.colorTheme, _a = font.color, color = _a === void 0 ? 'FF000000' : _a, _b = font.fontName, fontName = _b === void 0 ? 'Calibri' : _b, family = font.family, scheme = font.scheme, italic = font.italic, bold = font.bold, strikeThrough = font.strikeThrough, outline = font.outline, shadow = font.shadow, underline = font.underline, verticalAlign = font.verticalAlign;
        var children = [
            { name: 'sz', properties: { rawMap: { val: size } } },
            { name: 'color', properties: { rawMap: { theme: colorTheme, rgb: color } } },
            { name: 'name', properties: { rawMap: { val: fontName } } }
        ];
        if (family) {
            children.push({ name: 'family', properties: { rawMap: { val: family } } });
        }
        if (scheme) {
            children.push({ name: 'scheme', properties: { rawMap: { val: scheme } } });
        }
        if (italic) {
            children.push({ name: 'i' });
        }
        if (bold) {
            children.push({ name: 'b' });
        }
        if (strikeThrough) {
            children.push({ name: 'strike' });
        }
        if (outline) {
            children.push({ name: 'outline' });
        }
        if (shadow) {
            children.push({ name: 'shadow' });
        }
        if (underline) {
            children.push({ name: 'u', properties: { rawMap: { val: underline } } });
        }
        if (verticalAlign) {
            children.push({ name: 'vertAlign', properties: { rawMap: { val: verticalAlign } } });
        }
        return { name: "font", children: children };
    }
};
export default fontFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9udC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9leGNlbEV4cG9ydC9maWxlcy9vb3htbC9zdHlsZXMvZm9udC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxJQUFNLFdBQVcsR0FBdUI7SUFDcEMsV0FBVyxFQUFYLFVBQVksSUFBb0I7UUFFeEIsSUFBQSxJQUFJLEdBRUosSUFBSSxLQUZBLEVBQUUsVUFBVSxHQUVoQixJQUFJLFdBRlksRUFBRSxLQUVsQixJQUFJLE1BRmdDLEVBQWxCLEtBQUssbUJBQUcsVUFBVSxLQUFBLEVBQUUsS0FFdEMsSUFBSSxTQUZzRCxFQUFwQixRQUFRLG1CQUFHLFNBQVMsS0FBQSxFQUFFLE1BQU0sR0FFbEUsSUFBSSxPQUY4RCxFQUFFLE1BQU0sR0FFMUUsSUFBSSxPQUZzRSxFQUMxRSxNQUFNLEdBQ04sSUFBSSxPQURFLEVBQUUsSUFBSSxHQUNaLElBQUksS0FEUSxFQUFFLGFBQWEsR0FDM0IsSUFBSSxjQUR1QixFQUFFLE9BQU8sR0FDcEMsSUFBSSxRQURnQyxFQUFFLE1BQU0sR0FDNUMsSUFBSSxPQUR3QyxFQUFFLFNBQVMsR0FDdkQsSUFBSSxVQURtRCxFQUFFLGFBQWEsR0FDdEUsSUFBSSxjQURrRSxDQUNqRTtRQUVULElBQU0sUUFBUSxHQUFpQjtZQUMzQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUM7WUFDcEQsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUM7WUFDM0UsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFDO1NBQzdELENBQUM7UUFFRixJQUFJLE1BQU0sRUFBRTtZQUNSLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztTQUM3RTtRQUVELElBQUksTUFBTSxFQUFFO1lBQ1IsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDO1NBQzdFO1FBRUQsSUFBSSxNQUFNLEVBQUU7WUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FBRTtRQUM3QyxJQUFJLElBQUksRUFBRTtZQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUFFO1FBQzNDLElBQUksYUFBYSxFQUFFO1lBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQUU7UUFDekQsSUFBSSxPQUFPLEVBQUU7WUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7U0FBRTtRQUNuRCxJQUFJLE1BQU0sRUFBRTtZQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUFFO1FBQ2xELElBQUksU0FBUyxFQUFFO1lBQ1gsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDO1NBQzFFO1FBQ0QsSUFBSSxhQUFhLEVBQUU7WUFDZixRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7U0FDdEY7UUFFRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLFVBQUEsRUFBRSxDQUFDO0lBQ3RDLENBQUM7Q0FDSixDQUFDO0FBRUYsZUFBZSxXQUFXLENBQUMifQ==