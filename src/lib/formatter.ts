 const compactNumber  = new Intl.NumberFormat(undefined , {notation: "compact"})
export function formatterCompactNumber(number : number ) {
return compactNumber.format(number)
}