class Table {

    VACANT = 'vacant'
    BUSY = 'busy'
    TABLE_STATUSES = new Map([
        [this.VACANT, 'свободен'],
        [this.BUSY, 'занят'],
    ])

    _games = []
    _status
    _number
    _interface

    constructor(tableNumber, appInterface) {
        this._number = tableNumber
        this._interface = appInterface
        this._status = this.VACANT
        this.createElement()
    }

    createElement() {
        this._interface.addTable(this)
    }

    startGame(duration) {
        this._startGame(duration)
        this._busy()
        log(`Стол №${this._number} - запущена новая игра`)
    }

    stopGame() {
        this._stopGame()
        this._vacant()
        log(`Стол №${this._number} - игра остановлена`)
    }

    _startGame(duration) {
        this._currentGame = new Game(duration)
        this._games.push(this._currentGame)
        this._interface.updateGames(this)
    }

    _stopGame() {
        this._currentGame.stop()
        this._interface.updateGames(this)
    }

    _busy() {
        this._status = this.BUSY
        this._interface.updateTableStatus(this)
    }

    _vacant() {
        this._status = this.VACANT
        this._interface.updateTableStatus(this)
    }

    _stopGameHandler() {
        this._vacant()
    }

    get number() {
        return this._number
    }

    get status() {
        return this._status
    }

    get element() {
        return this._element
    }

    get games() {
        return this._games
    }

    set status(status) {
        if (this.TABLE_STATUSES.has(status))
            this._status = status
    }

}