export function formatYmdTodmY(date: string) {
    const parts = date.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    const dateObject = new Date(parseInt((parts ? parts[0] : '')), parseInt((parts ? (parseInt(parts[1])-1).toString() : '')), parseInt((parts ? parts[2] : ''))); // months are 0-based

    var month = '' + (dateObject.getMonth() + 1),
        day = '' + dateObject.getDate(),
        year = dateObject.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}