function getAmountTest(testData) {
    log('getAmountTest start', 'info')
    for (let row of testData) {
        let startTime = new Date(row[0])
        let endTime = new Date(row[1])
        let amount = getAmount(startTime, endTime)
        if (amount === row[2]) log('test passed', 'success')
        else log(`test failed - amoun from ${row[0]} to ${row[1]} is ${amount}, but not ${row[2]}`, 'error')
    }
}

function getGameDurationTest(testData) {
    log('getGameDurationTest start', 'info')
    for (let row of testData) {
        let startTime = new Date(row[0])
        let amount = row[1]
        let gameDuration = getGameDuration(startTime, amount)
        if (
            gameDuration.get('hours') === row[2].get('hours') &&
            gameDuration.get('minutes') === row[2].get('minutes') &&
            gameDuration.get('seconds') === row[2].get('seconds')
        ) log('test passed', 'success')
        else log(`test failed - gameDuration on ${amount} is ${gameDuration.get('hours')}:${gameDuration.get('minutes')}:${gameDuration.get('seconds')}, but not ${row[2].get('hours')}:${row[2].get('minutes')}:${row[2].get('seconds')}`, 'error')
    }
}

function test(testData) {
    getAmountTest(testData[0])
    getGameDurationTest(testData[1])
}

let testData = [
    [
        ['2020-12-12 00:00', '2020-12-12 00:00', 0],
        ['2020-12-12 00:00', '2020-12-12 00:30', 65],
        ['2020-12-12 00:00', '2020-12-12 01:00', 130],
        ['2020-12-12 00:00', '2020-12-12 01:30', 195],
        ['2020-12-12 00:00', '2020-12-12 02:00', 260],
        ['2020-12-12 00:00', '2020-12-12 08:00', 1040],
        ['2020-12-12 00:00', '2020-12-12 09:00', 1125],
        ['2020-12-12 00:00', '2020-12-12 19:00', 1975],
        ['2020-12-12 00:00', '2020-12-12 20:00', 2085],
        ['2020-12-12 00:00', '2020-12-12 23:00', 2415],
        ['2020-12-12 00:00', '2020-12-12 24:00', 2545],
        ['2020-12-12 00:00', '2020-12-13 00:00', 2545],
        ['2020-12-12 07:00', '2020-12-12 08:00', 130],
        ['2020-12-12 07:00', '2020-12-12 09:00', 215],
        ['2020-12-12 08:00', '2020-12-12 09:00', 85],
        ['2020-12-12 08:00', '2020-12-12 08:30', 42.5],
        ['2020-12-12 08:00', '2020-12-12 09:30', 127.5],
        ['2020-12-12 08:00', '2020-12-12 19:00', 935],
        ['2020-12-12 08:00', '2020-12-12 23:00', 1375],
        ['2020-12-12 08:00', '2020-12-12 24:00', 1505],
        ['2020-12-12 08:00', '2020-12-13 00:00', 1505],
        ['2020-12-12 18:00', '2020-12-12 19:00', 85],
        ['2020-12-12 18:00', '2020-12-12 20:00', 195],
        ['2020-12-12 19:00', '2020-12-12 20:00', 110],
        ['2020-12-12 19:00', '2020-12-12 19:30', 55],
        ['2020-12-12 19:00', '2020-12-12 23:00', 440],
        ['2020-12-12 19:00', '2020-12-12 23:00', 440],
        ['2020-12-12 19:00', '2020-12-12 24:00', 570],
        ['2020-12-12 23:00', '2020-12-12 23:30', 65],
        ['2020-12-12 23:00', '2020-12-12 24:00', 130],
        ['2020-12-12 23:00', '2020-12-13 00:00', 130],
        ['2020-12-12 23:00', '2020-12-13 00:30', 195],
        ['2020-12-12 23:00', '2020-12-13 01:00', 260],
        ['2020-12-12 23:00', '2020-12-13 08:00', 1170],
        ['2020-12-12 23:00', '2020-12-13 09:00', 1255],
    ],
    [
        ['2020-12-12 00:00', 0, new Map([
            ['hours', 0],
            ['minutes', 0],
            ['seconds', 0]
        ])],
        ['2020-12-12 00:00', 10, new Map([
            ['hours', 0],
            ['minutes', 4],
            ['seconds', 37]
        ])],
        ['2020-12-12 00:00', 65, new Map([
            ['hours', 0],
            ['minutes', 30],
            ['seconds', 0]
        ])],
        ['2020-12-12 00:00', 130, new Map([
            ['hours', 1],
            ['minutes', 0],
            ['seconds', 0]
        ])],
        ['2020-12-12 00:00', 150, new Map([
            ['hours', 1],
            ['minutes', 9],
            ['seconds', 14]
        ])],
        ['2020-12-12 00:00', 200, new Map([
            ['hours', 1],
            ['minutes', 32],
            ['seconds', 18]
        ])],
        ['2020-12-12 00:00', 260, new Map([
            ['hours', 2],
            ['minutes', 0],
            ['seconds', 0]
        ])],
        ['2020-12-12 00:00', 1040, new Map([
            ['hours', 8],
            ['minutes', 0],
            ['seconds', 0]
        ])],
        ['2020-12-12 00:00', 1100, new Map([
            ['hours', 8],
            ['minutes', 42],
            ['seconds', 21]
        ])],
        ['2020-12-12 00:00', 1975, new Map([
            ['hours', 19],
            ['minutes', 0],
            ['seconds', 0]
        ])],
        ['2020-12-12 00:00', 2415, new Map([
            ['hours', 23],
            ['minutes', 0],
            ['seconds', 0]
        ])],
        ['2020-12-12 00:00', 2545, new Map([
            ['hours', 24],
            ['minutes', 0],
            ['seconds', 0]
        ])],
        ['2020-12-12 08:00', 935, new Map([
            ['hours', 11],
            ['minutes', 0],
            ['seconds', 0]
        ])],
        ['2020-12-12 19:00', 440, new Map([
            ['hours', 4],
            ['minutes', 0],
            ['seconds', 0]
        ])],
        ['2020-12-12 19:00', 700, new Map([
            ['hours', 6],
            ['minutes', 0],
            ['seconds', 0]
        ])],
        ['2020-12-12 23:00', 130, new Map([
            ['hours', 1],
            ['minutes', 0],
            ['seconds', 0]
        ])],
        ['2020-12-12 23:00', 1255, new Map([
            ['hours', 10],
            ['minutes', 0],
            ['seconds', 0]
        ])],
    ]
]

test(testData)