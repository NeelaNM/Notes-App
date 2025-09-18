export const convertTimeStamp = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const time = dateObj.getHours() + ':' + dateObj.getMinutes();

    const convertedTime = day + '/' + month +'/' + year + '     ' + time;

    return convertedTime;
}