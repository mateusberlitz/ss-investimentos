export function getHour(date: string) {
    var d = new Date(date);

    return [d.getHours(), ( (d.getMinutes() < 10 ? '0' : '') + d.getMinutes())].join(':');
}