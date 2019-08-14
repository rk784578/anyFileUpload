exports.dateAndTime = function () {
    let dt = new Date();
    var h = dt.getHours(), m = dt.getMinutes();
    var _time = (h > 12) ? (h - 12 + ':' + m + ' PM') : (h + ':' + m + ' AM');

    //console.log(dateAndTime);
    return _time;
};

exports.convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
};
exports.convertDateToInteger = (data) => {
    if (data == undefined || data == null || data == "") {
        return Number();

    } else {
        var dateToConvert = new Date(data);
        // month should return with a leading zero incase of single digit number
        var month = (dateToConvert.getMonth() + 1) <= 9 ? '0' + (dateToConvert.getMonth() + 1) : (dateToConvert.getMonth() + 1);
        var day = dateToConvert.getDate() <= 9 ? '0' + dateToConvert.getDate() : dateToConvert.getDate();
        var formattedDate = dateToConvert.getFullYear().toString() + month + day;
        return Number(formattedDate); //This will convert the date string into number, in order to store in database
    }
};


