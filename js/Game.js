class Game {

    NOT_STARTED = 'not started'
    IN_PROGRESS = 'in progress'
    FINISHED = 'finished'

    _status
    _startTime
    _endTime
    _endTimeTimerId

    constructor(duration) {
        this.start(duration)
    }

    start(duration) {
        if (this._status !== undefined) {
            return
        }
        this._status = this.IN_PROGRESS
        this._startTime = new Date()
        if (duration !== undefined) {
            let endTimeTS = ts(this._startTime) + duration
            this._endTime = new Date(endTimeTS * 1000)
            this.setStopHandler()
        }
    }

    addTime(duration) {
        if (this._status !== this.IN_PROGRESS) {
            return
        }
        this._endTime.setSeconds(foo.getSeconds() + duration)
        this.setStopHandler()
    }

    stop() {
        if (this._status != this.IN_PROGRESS) {
            return
        }
        if (this._endTimeTimerId !== undefined) {
            clearTimeout(this._endTimeTimerId);
        }
        this._status = this.FINISHED
        this._endTime = new Date()
    }

    setStopHandler() {
        if (this._endTimeTimerId !== undefined) {
            clearTimeout(this._endTimeTimerId);
        }
        this._endTimeTimerId = setTimeout(this.stop, this._endTime - this._startTime)
    }

    get status() {
        return this._status
    }

    get startTime() {
        return this._startTime
    }

    get endTime() {
        return this._endTime
    }

}