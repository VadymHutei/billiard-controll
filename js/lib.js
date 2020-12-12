function getAmount(startTime, endTime) {
    if (startTime === undefined || endTime === undefined) return 0
    if (startTime == endTime) return 0
    if (startTime > endTime) return 0
    let amount = 0
    while (true) {
        for (let rateIndex = 0; rateIndex < RATES.length; rateIndex++) {
            let rate = RATES[rateIndex][1]
            let nextRateIndex = (rateIndex + 1) % RATES.length
            let nextRateStart = new Date(startTime)
            if (RATES[nextRateIndex][0] === 0) nextRateStart.setDate(nextRateStart.getDate() + 1)
            nextRateStart.setHours(RATES[nextRateIndex][0])
            if (startTime > nextRateStart) continue
            if (endTime > nextRateStart) {
                let timeLeft = nextRateStart - startTime
                amount += ms2h(timeLeft) * rate
                startTime = nextRateStart
            } else {
                let timeLeft = endTime - startTime
                amount += ms2h(timeLeft) * rate
                return amount
            }
        }
    }
}

function getGameDuration(startTime, amount) {
    let duration = 0
    while (true) {
        for (let rateIndex = 0; rateIndex < RATES.length; rateIndex++) {
            let rate = RATES[rateIndex][1]
            let nextRateIndex = (rateIndex + 1) % RATES.length
            let nextRateStart = new Date(startTime)
            if (RATES[nextRateIndex][0] === 0) nextRateStart.setDate(nextRateStart.getDate() + 1)
            nextRateStart.setHours(RATES[nextRateIndex][0])
            if (startTime > nextRateStart) continue
            let gameDuration = h2ms(amount / rate)
            let rateDuration = nextRateStart - startTime
            if (gameDuration > rateDuration) {
                duration += rateDuration
                amount -= ms2h(rateDuration) * rate
                startTime = nextRateStart
            } else {
                duration += gameDuration
                return ms2TimeMap(duration)
            }
        }
    }
}

function ms2TimeMap(ms) {
    return new Map([
        ['hours', Math.trunc(ms / (60 * 60 * 1000))],
        ['minutes', Math.trunc((ms / (60 * 1000)) % 60)],
        ['seconds', Math.round((ms / 1000) % 60)],
        ['totalMilliseconds', ms],
    ])
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

function ms2h(ms) {
    return ms / (1000 * 60 * 60)
}

function h2ms(h) {
    return Math.round(h * 60 * 60 * 1000)
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