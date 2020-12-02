class App {

    _tablesNumber
    _tables = []
    _interface

    constructor(tablesNumber = 3) {
        log('Запуск приложения')

        this._tablesNumber = tablesNumber
        this._interface = new Interface()
        this._createUI()

        log('Приложение запущено', 'success')
        log(`Добавлено столов: ${this._tables.length}`)
    }

    _createUI() {
        log('Добавление столов')
        for (let tableNumber = 1; tableNumber <= this._tablesNumber; tableNumber++) {
            this._tables.push(new Table(tableNumber, this._interface))
        }
    }

}