function getAmount(startTime, endTime) {
    let startTimeTS = ts(startTime)
    let endTimeTS = ts(endTime)
    let timeToPlay = endTimeTS - startTimeTS
    let baseTime = startTimeTS
    let curPrice = BASEPRICE
    let amount = 0

    for (let pair of PRICES) {
        let raiseTimestamp = getTimeStampForHour(pair[0], startTime)
        if (baseTime < raiseTimestamp) {
            if (endTimeTS < raiseTimestamp) {
                amount += secondsToHours(timeToPlay) * curPrice
                let diff = endTimeTS - baseTime
                timeToPlay -= diff
                break
            } else {
                let diff = raiseTimestamp - baseTime
                amount += secondsToHours(diff) * curPrice
                timeToPlay -= diff
                baseTime = raiseTimestamp
                curPrice = pair[1]
            }
        } else {
            curPrice = pair[1]
        }
    }
    if (timeToPlay) {
        amount += secondsToHours(timeToPlay) * curPrice
    }

    return amount
}

function ts(date) {
    return Math.round(date.getTime() / 1000)
}

function getTimeStampForHour(hour, currentDate = new Date()) {
    let date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        hour
    )
    return ts(date)
}

function secondsToHours(seconds) {
    return seconds / 3600
}

function formatTime(dateTime) {
    return [
        dateTime.getHours().toString().padStart(2, '0'),
        dateTime.getMinutes().toString().padStart(2, '0'),
        dateTime.getSeconds().toString().padStart(2, '0'),
    ].join(':')
}

function getTimeInSeconds(hours = 0, minutes = 0) {
    return (hours * 60 * 60) + (minutes * 60)
}

function log(message, statusName = 'info') {
    const MESSAGE_STATUSES = new Map([
        ['info', new Map([
            ['status', 'INFO'],
            ['color', 'inherit'],
        ])],
        ['success', new Map([
            ['status', 'SUCCESS'],
            ['color', '#00ff00'],
        ])],
        ['error', new Map([
            ['status', 'ERROR'],
            ['color', '#ff0000'],
        ])],
    ])
    let status = MESSAGE_STATUSES.has(statusName) ? MESSAGE_STATUSES.get(statusName) : MESSAGE_STATUSES.get('info')
    let style = `color: ${status.get('color')}`
    console.log(`%c${formatTime(new Date())} ${status.get('status')}: ${message}`, style)
}