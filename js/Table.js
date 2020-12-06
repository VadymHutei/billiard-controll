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

    constructor(tableNumber) {
        this._number = tableNumber
        this._status = this.VACANT
    }

    startNewGame(duration) {
        this._startGame(duration)
        this._setStatus(this.BUSY)
    }

    addTimeToCurrentGame(duration) {
        this._currentGame.addTime(duration)
    }

    stopCurrentGame() {
        this._stopCurrentGame()
        this._setStatus(this.VACANT)
    }

    _startGame(duration) {
        this._currentGame = new Game(duration)
        this._games.push(this._currentGame)
        log(`Стол №${this._number} - запущена новая игра`)
    }

    _stopCurrentGame() {
        this._currentGame.stop()
        log(`Стол №${this._number} - игра остановлена`)
    }

    _setStatus(status) {
        this._status = status
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