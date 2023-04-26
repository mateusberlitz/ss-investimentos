export function dateObject(date: string) {
    var parts = date.match(/(\d+)/g);

    return new Date(parseInt((parts ? parts[0] : '')), parseInt((parts ? (parseInt(parts[1])-1).toString() : '')), parseInt((parts ? parts[2] : '')));
}