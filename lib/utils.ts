export function addCommas(commas: number):string {
    //addCommas function
    return commas.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}