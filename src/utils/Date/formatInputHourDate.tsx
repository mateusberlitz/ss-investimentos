export function formatInputHourDate(date: string) {
    console.log(date);
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        min = d.getMinutes(),
        sec = d.getSeconds(),
        hour = d.getHours();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-') + " " + [hour, ( (min < 10 ? '0' : '') + min), "00"].join(':');
}