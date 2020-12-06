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

    constructor(tableNumber) {
        this._number = tableNumber
        this._status = this.VACANT
    }

    startNewGame(duration, toPay, paid) {
        this._startGame(duration, toPay, paid)
        this._setStatus(this.BUSY)
    }

    addTimeToCurrentGame(duration) {
        this._addTimeToCurrentGame(duration)
    }

    stopCurrentGame() {
        this._stopCurrentGame()
        this._setStatus(this.VACANT)
    }

    _startGame(duration, toPay, paid) {
        this._currentGame = new Game(duration, toPay, paid)
        this._games.push(this._currentGame)
        this._log('запущена новая игра')
    }

    _addTimeToCurrentGame(duration) {
        this._currentGame.addTime(duration)
        this._log('Для текущей игры добавлено время')
    }

    _stopCurrentGame() {
        this._currentGame.stop()
        this._log('игра остановлена')
    }

    _setStatus(status) {
        this._status = status
    }

    _stopGameHandler() {
        this._vacant()
    }

    _log(message) {
        log(`Стол №${this._number} - ${message}`)
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