class Interface {

    _appBlockId = 'app'

    constructor() {
        this._appBlock = document.getElementById(this._appBlockId)
    }

    addTable(table) {
        let element = this._createTableElement(table)
        this._setTableHandlers(element, table)
        this._appBlock.appendChild(element)
    }

    updateTableStatus(table) {
        let tableElement = this._getTableElement(table)
        let tableStatusElement = tableElement.querySelector('.table .status')
        tableElement.dataset.status = table.status
        tableStatusElement.textContent = table.TABLE_STATUSES.get(table.status)
        tableStatusElement.classList.add(table.status)
    }

    updateGames(table) {
        let tableElement = this._getTableElement(table)
        let tableGamesTable = tableElement.querySelector('.games_table')
        let tableGamesTableBody = tableGamesTable.querySelector('tbody')

        let gamesTable = document.createDocumentFragment()
        for (let game of table.games) {
            console.log(game)
            let gameRow = document.createElement('tr')

            let startGameCell = document.createElement('td')
            if (game.startTime !== undefined) {
                startGameCell.innerText = formatTime(game.startTime)
            }
            gameRow.appendChild(startGameCell)

            let endGameCell = document.createElement('td')
            if (game.endTime !== undefined) {
                endGameCell.innerText = formatTime(game.endTime)
            }
            gameRow.appendChild(endGameCell)

            let amountGameCell = document.createElement('td')
            amountGameCell.innerText = getAmount(game.startTime, game.endTime).toFixed(2)
            gameRow.appendChild(amountGameCell)

            gamesTable.appendChild(gameRow)
        }
        tableGamesTableBody.innerHTML = ''
        tableGamesTableBody.appendChild(gamesTable)
    }

    _createTableElement(table) {
        let element = this._getTemplate('table')
        element.querySelector('.table').setAttribute('id', 'table_' + table.number)
        element.querySelector('.table').dataset.status = table.status
        element.querySelector('.table .title').textContent = 'Стол ' + table.number
        element.querySelector('.table .status').textContent = table.TABLE_STATUSES.get(table.status)

        return element
    }

    _setTableHandlers(element, table) {
        element.querySelector('.game_start_button').addEventListener('click', this._startNewGame.bind(this, table))
        element.querySelector('.game_stop_button').addEventListener('click', function() {
            table.stopGame()
        })
    }

    _startNewGame(table) {
        function updateAmount() {
            let hours = parseInt(hoursField.value)
            let minutes = parseInt(minutesField.value)
            let gameDuration = getTimeInSeconds(hours, minutes)
            let startTime = new Date()
            let endTime = new Date((ts(startTime) + gameDuration) * 1000)
            let amount = getAmount(startTime, endTime)
            amountField.value = amount.toFixed(2)
        }

        function startGame() {
            let hours = parseInt(hoursField.value)
            let minutes = parseInt(minutesField.value)
            let timeToPlay = getTimeInSeconds(hours, minutes)
            document.querySelector('.new_game_param_form_wrap').remove()
            table.startGame(timeToPlay)
        }

        let newGameParamsPopup = this._getTemplate('new_game_params_form')
        let hoursField = newGameParamsPopup.querySelector('#hours')
        let minutesField = newGameParamsPopup.querySelector('#minutes')
        let amountField = newGameParamsPopup.querySelector('#amount')
        let startGameButton = newGameParamsPopup.querySelector('#start_game')

        hoursField.addEventListener('input', updateAmount)
        minutesField.addEventListener('input', updateAmount)
        startGameButton.addEventListener('click', startGame)

        this._appBlock.appendChild(newGameParamsPopup)
    }

    _getTemplate(templateName) {
        let templateId = templateName + '_template'
        return document.getElementById(templateId).content.cloneNode(true)
    }

    _getTableElementId(table) {
        return `table_${table.number}`
    }

    _getTableElement(table) {
        let tableElementId = this._getTableElementId(table)
        return document.getElementById(tableElementId)
    }

}