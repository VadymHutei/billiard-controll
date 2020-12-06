tables = []
appBlock = document.getElementById('app')
tableTemplate = document.getElementById('table_template')
startGamePopupTemplate = document.getElementById('new_game_params_form_template')


function updateAmount(hoursField, minutesField, amountField) {
    let hours = parseInt(hoursField.value)
    let minutes = parseInt(minutesField.value)
    let gameDuration = getTimeInSeconds(hours, minutes)
    let startTime = new Date()
    let endTime = new Date((ts(startTime) + gameDuration) * 1000)
    let amount = getAmount(startTime, endTime)
    amountField.value = amount.toFixed(2)
}

function showSetTimePopup(okCallback) {
    let startGamePopup = startGamePopupTemplate.content.cloneNode(true)
    let hoursField = startGamePopup.querySelector('#hours')
    let minutesField = startGamePopup.querySelector('#minutes')
    let amountField = startGamePopup.querySelector('#amount')
    let isPaidField = startGamePopup.querySelector('#is_paid')
    let okButton = startGamePopup.querySelector('#start_game')
    hoursField.addEventListener('input', updateAmount.bind(this, hoursField, minutesField, amountField))
    minutesField.addEventListener('input', updateAmount.bind(this, hoursField, minutesField, amountField))
    okButton.addEventListener('click', function() {
        okCallback(this, hoursField, minutesField, amountField, isPaidField)
        document.querySelector('.new_game_param_form_wrap').remove()
    }.bind(this))
    appBlock.appendChild(startGamePopup)
}

function updateGames(table) {
    let tableElement = document.getElementById(`table_${table.number}`)
    let tableGamesTable = tableElement.querySelector('.games_table')
    let tableGamesTableBody = tableGamesTable.querySelector('tbody')

    let gamesTable = document.createDocumentFragment()
    for (let game of table.games) {
        let gameRow = document.createElement('tr')
        let gameStartTimeCell = document.createElement('td')
        if (game.startTime !== undefined) {
            gameStartTimeCell.innerText = formatTime(game.startTime)
        }
        gameRow.appendChild(gameStartTimeCell)
        let gameEndTimeCell = document.createElement('td')
        if (game.endTime !== undefined) {
            gameEndTimeCell.innerText = formatTime(game.endTime)
        }
        gameRow.appendChild(gameEndTimeCell)
        let gameAmountCell = document.createElement('td')
        gameAmountCell.innerText = getAmount(game.startTime, game.endTime).toFixed(2)
        gameRow.appendChild(gameAmountCell)
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

function getTimeToPlay(hoursField, minutesField) {
    let hours = parseInt(hoursField.value)
    let minutes = parseInt(minutesField.value)
    return getTimeInSeconds(hours, minutes)
}

function startNewGame(table, hoursField, minutesField, amountField, isPaidField) {
    let amount = parseInt(amountField.value)
    table.startNewGame(
        getTimeToPlay(hoursField, minutesField),
        amount,
        isPaidField.checked ? amount : 0
    )
    updateTable(table)
}

function stopCurrentGame(table) {
    table.stopCurrentGame()
    updateTable(table)
}

function addTimeToCurrentGame(table, hoursField, minutesField) {
    table.addTimeToCurrentGame(getTimeToPlay(hoursField, minutesField))
    updateTable(table)
}

// ************************************ START ********************************************

log('Добавление столов')

for (let tableNumber = 1; tableNumber <= TABLES_NUMBER; tableNumber++) {
    tables.push(new Table(tableNumber))
}

log(`Добавлено столов: ${tables.length}`)

log('Создание интерфейса')

for (let table of tables) {
    let element = tableTemplate.content.cloneNode(true)
    element.querySelector('.table').setAttribute('id', 'table_' + table.number)
    element.querySelector('.table').dataset.status = table.status
    element.querySelector('.table .title').textContent = 'Стол ' + table.number
    element.querySelector('.table .status').textContent = table.TABLE_STATUSES.get(table.status)
    element.querySelector('.start_game_button').addEventListener('click', showSetTimePopup.bind(table, startNewGame))
    element.querySelector('.stop_game_button').addEventListener('click', stopCurrentGame.bind(this, table))
    element.querySelector('.game_add_time_button').addEventListener('click', showSetTimePopup.bind(table, addTimeToCurrentGame))
    appBlock.appendChild(element)
}