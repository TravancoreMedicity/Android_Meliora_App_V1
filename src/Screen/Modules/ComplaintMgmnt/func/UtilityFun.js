import moment from 'moment'
// GET TIME DIFFRENCE AND CONVER TO DATE TIME MODE FOR REACT LIVE CLOCK FUNCTION
export const getTimeDiffrenceForLiveClock = (compalint_date) => {
    const startTime = moment(compalint_date);
    const endTime = moment();
    const timeDiffrence = endTime.diff(startTime)
    const duration = moment.duration(timeDiffrence)

    const formattedTime = moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
    const date = moment(formattedTime, 'HH:mm:ss').format()
    return date
}

//DAY DIFFRENCE INCLUDING THE TIME ALASO 
export const getDayDiffrenceIncludeTheTime = (compalint_date) => {
    const startTime = moment(compalint_date);
    const endTime = moment();
    return endTime.diff(startTime, 'day')
}