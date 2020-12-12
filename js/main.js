tables = []
appBlock = document.getElementById('app')
tableTemplate = document.getElementById('table_template')
addGamePopupTemplate = document.getElementById('add_game_popup_template')
payPopupTemplate = document.getElementById('pay_popup_template')


function updateAmount(hoursField, minutesField, amountField) {
    let hours = parseInt(hoursField.value)
    let minutes = parseInt(minutesField.value)
    if (isNaN(hours)) hours = 0
    if (isNaN(minutes)) minutes = 0
    let gameDuration = getTimeInSeconds(hours, minutes)
    let startTime = this.currentGame === null ? new Date() : this.currentGame.endTime
    let endTime = new Date((ts(startTime) + gameDuration) * 1000)
    let amount = getAmount(startTime, endTime)
    amountField.value = Math.round(amount)
}

function updateTime(hoursField, minutesField, amountField) {
    let amount = parseInt(amountField.value)
    if (isNaN(amount)) amount = 0
    let startTime = this.currentGame === null ? new Date() : this.currentGame.endTime
    let gameDuration = getGameDuration(startTime, amount)
    hoursField.value = gameDuration.get('hours')
    minutesField.value = gameDuration.get('minutes')
}

function addGamePopup() {
    let addGamePopup = addGamePopupTemplate.content.cloneNode(true)
    let hoursField = addGamePopup.querySelector('#hours')
    let minutesField = addGamePopup.querySelector('#minutes')
    let amountField = addGamePopup.querySelector('#amount')
    let isPaidField = addGamePopup.querySelector('#is_paid')
    let okButton = addGamePopup.querySelector('#start_game')
    hoursField.addEventListener('input', updateAmount.bind(this, hoursField, minutesField, amountField))
    minutesField.addEventListener('input', updateAmount.bind(this, hoursField, minutesField, amountField))
    amountField.addEventListener('input', updateTime.bind(this, hoursField, minutesField, amountField))
    okButton.addEventListener('click', function() {
        addGame(this, hoursField, minutesField, amountField, isPaidField)
        document.querySelector('.add_game_popup_wrap').remove()
    }.bind(this))
    appBlock.appendChild(addGamePopup)
}

function payPopup() {
    let payPopup = payPopupTemplate.content.cloneNode(true)
    let amountField = payPopup.querySelector('#amount')
    let okButton = payPopup.querySelector('#pay_game')
    okButton.addEventListener('click', function() {
        payGame(this, amountField)
        document.querySelector('.pay_game_popup_wrap').remove()
    }.bind(this))
    appBlock.appendChild(payPopup)
}

function payGame(table, amountField) {
    let amount = parseInt(amountField.value)
    console.log(amount)
    table.payCurrentGame(amount)
    updateTable(table)
}

function updateGames(table) {
    let tableElement = document.getElementById(`table_${table.number}`)
    let tableGamesTable = tableElement.querySelector('.games_table')
    let tableGamesTableBody = tableGamesTable.querySelector('tbody')

    let gamesTable = document.createDocumentFragment()
    for (let game of table.games) {
        let gameRow = document.createElement('tr')
        let gameStartTimeCell = document.createElement('td')
        if (game.startTime !== undefined)
            gameStartTimeCell.innerText = formatTime(game.startTime)
        gameRow.appendChild(gameStartTimeCell)
        let gameEndTimeCell = document.createElement('td')
        if (game.endTime !== undefined)
            gameEndTimeCell.innerText = formatTime(game.endTime)
        gameRow.appendChild(gameEndTimeCell)
        let gameAmountCell = document.createElement('td')
        gameAmountCell.innerText = getAmount(game.startTime, game.endTime).toFixed(2)
        gameRow.appendChild(gameAmountCell)
        let paidCell = document.createElement('td')
        paidCell.innerText = game.paid.toFixed(2)
        gameRow.appendChild(paidCell)
        let gameStatusCell = document.createElement('td')
        gameStatusCell.innerText = game.status
        gameRow.appendChild(gameStatusCell)
        gamesTable.appendChild(gameRow)
    }
    tableGamesTableBody.innerHTML = ''
    tableGamesTableBody.appendChild(gamesTable)
}

function updateTableStatus(table) {
    let tableElement = document.getElementById(`table_${table.number}`)
    let tableStatusElement = tableElement.querySelector('.table .status')
    tableElement.dataset.status = table.status
    tableStatusElement.textContent = table.TABLE_STATUSES.get(table.status)
    tableStatusElement.classList.add(table.status)
}

function updateTable(table) {
    updateTableStatus(table)
    updateGames(table)
}

function addGame(table, hoursField, minutesField, amountField, isPaidField) {
    let hours = parseInt(hoursField.value)
    let minutes = parseInt(minutesField.value)
    let duration = getTimeInSeconds(hours, minutes)
    let amount = parseInt(amountField.value)
    let isPaid = isPaidField.checked
    table.currentGame === null ?
        table.startNewGame(duration, amount, isPaid) :
        table.addTimeToCurrentGame(duration, amount, isPaid)
    updateTable(table)
}

function showTables(tables) {
    for (let table of tables) {
        if (table.number > 1) appBlock.appendChild(document.createElement('hr'))
        let tableElement = createTableElement(table)
        appBlock.appendChild(tableElement)
    }
}

function createTableElement(table) {
    let element = tableTemplate.content.cloneNode(true)
    element.querySelector('.table').setAttribute('id', 'table_' + table.number)
    element.querySelector('.table').dataset.status = table.status
    element.querySelector('.table .title').textContent = 'Стол ' + table.number
    element.querySelector('.table .status').textContent = table.TABLE_STATUSES.get(table.status)
    element.querySelector('.start_game_button').addEventListener('click', addGamePopup.bind(table))
    element.querySelector('.stop_game_button').addEventListener('click', function() {
        table.stopCurrentGame()
        updateTable(table)
    })
    element.querySelector('.game_add_time_button').addEventListener('click', addGamePopup.bind(table))
    element.querySelector('.pay_button').addEventListener('click', payPopup.bind(table))
    return element
}

// ************************************ START ********************************************

log('Добавление столов')

for (let tableNumber = 1; tableNumber <= TABLES_NUMBER; tableNumber++) {
    tables.push(new Table(tableNumber))
}

log(`Добавлено столов: ${tables.length}`)

log('Создание интерфейса')

showTables(tables)