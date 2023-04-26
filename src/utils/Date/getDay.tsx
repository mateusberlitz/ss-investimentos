export function getDay(date:string){
    const parts = date.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    const dateObject = new Date(parseInt((parts ? parts[0] : '')), parseInt((parts ? (parseInt(parts[1])-1).toString() : '')), parseInt((parts ? parts[2] : ''))); // months are 0-based

    return dateObject.getDate();
}