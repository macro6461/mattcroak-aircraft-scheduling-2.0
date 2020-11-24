const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
}

export const genReadableDate = (date) =>{
        var day = `${date.getDate()}`
        var lastDigit = day[day.length - 1];
        var ordinal = 'th';
        if (lastDigit === '1'){
            ordinal = 'st'
        } else if (lastDigit === '2'){
            ordinal = 'nd'
        } else if (lastDigit === '3'){
            ordinal = 'rd'
        }

        return date.getDate() + ordinal + ' ' + months[date.getMonth()] + ' ' +  date.getFullYear()
    
};

export const calcUsability = (rotations) =>{
    var totalMins = 0;

    rotations.forEach(x=> {
        var timeInMins  = (x.arrivaltime - x.departuretime) / 60
        //need to include turnaround
        totalMins += timeInMins + 20
    })

    //mins in 24 hours = 1440
    var x = (totalMins / 1440) * 100

    return Math.round(x)
};

export const handleDestinationMatch = (rotations) =>{
    rotations.forEach((x, i)=>{
        if (i >= 1){
            var prevRotationDestination = rotations[i-1].destination
            x.destMatch = prevRotationDestination === x.origin
        } else {
            x.destMatch = true
        }
    })

    return rotations
}