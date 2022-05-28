// Formats values in metric ton.
export function formatMetricTon(value) {
    // Round the value.
    var formattedValue = Math.round(value).toString();

    //Add '.' for every 3 numbers before the decimal.
    formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    return formattedValue;
}

// Formats values in euro's.
export function formatEuros(value, roundAmount) {
    var formattedValue;

    // If roundAmount is zero, do not round at all.
    if(roundAmount == 0)
        formattedValue = parseFloat(value).toFixed(2);
    // Else, round to nearest amount of the value of roundAmount.
    else
        formattedValue = Math.round(value / roundAmount) * roundAmount;

    //Convert to string
    formattedValue = formattedValue.toString();
    
    //Swap dot with comma for decimals.
    formattedValue = formattedValue.replace('.', ',')
    
    //Add '.' for every 3 numbers before the decimal.
    formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    return formattedValue;
  }