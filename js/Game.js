class Game {

    NOT_STARTED = 'еще не начали'
    IN_PROGRESS = 'играют'
    FINISHED = 'закончили'

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
        if (duration !== 0) {
            let endTimeTS = ts(this._startTime) + duration
            this._endTime = new Date(endTimeTS * 1000)
            this.setStopHandler()
        }
    }

    addTime(duration) {
        if (this._status !== this.IN_PROGRESS) {
            return
        }
        if (this._endTime === undefined) {
            this._endTime = new Date()
        }
        this._endTime.setSeconds(this._endTime.getSeconds() + duration)
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